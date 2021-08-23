import React, { useRef, useState } from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { useReactToPrint } from 'react-to-print';
import { v4 as uuidv4 } from 'uuid';
import { t } from '@konrad/reweb-aem';
import PropTypes from 'prop-types';
import { Button, SelectInput, TextInput, Icon, LineGraph } from '../index';
import styles from './DebtConsolidationCalculator.module.scss';
import cx from 'classnames';
import { getHelpTextId, removeSymbols } from '../../lib/helpers/form';
import { CURRENCY_MASK_OPTIONS, LINK_TYPES, PERCENTAGE_MASK_OPTIONS } from '../../lib/constants';

const DebtConsolidationCalculator = (props) => {
    const {
        ctaLinkAltText,
        ctaLinkText,
        ctaLinkType,
        ctaLinkUrl,
        debtBalanceDefault,
        debtBalanceErrorMessage,
        debtBalanceSubtitle,
        debtBalanceTitle,
        debtTypeOptions,
        debtTypeTitle,
        downloadText,
        interestDefault,
        interestErrorMessage,
        interestSubtitle,
        interestTitle,
        monthlyPaymentDefault,
        monthlyPaymentErrorMessage,
        monthlyPaymentSubtitle,
        monthlyPaymentTitle,
        newBillText,
        totalDebtBalanceErrorMessage,
    } = props;
    const rootRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => rootRef.current,
    });

    const currencyMask = createNumberMask(CURRENCY_MASK_OPTIONS);
    const percentageMask = createNumberMask(PERCENTAGE_MASK_OPTIONS);

    const debtTypeId = 'debt-type';
    const debtTypeOptionsFormatted = debtTypeOptions.map((debtType) => ({
        ...debtType,
        value: debtType.name.toLowerCase().replace(/\s/g, '-'),
    }));
    const debtBalanceId = 'debt-balance';
    const debtBalanceHelpTextId = getHelpTextId(debtBalanceId);
    const minDebtBalance = 100;
    const maxDebtBalance = 20000;
    const maxTotalDebtBalance = 20000;
    const interestId = 'interest';
    const interestHelpTextId = getHelpTextId(interestId);
    const minInterest = 0;
    const maxInterest = 60;
    const monthlyPaymentId = 'monthly-payment';
    const monthlyPaymentHelpTextId = getHelpTextId(monthlyPaymentId);
    const minMonthlyPayment = 10;
    const maxMonthlyPayment = 999;

    const defaultInput = {
        id: '',
        [debtTypeId]: debtTypeOptionsFormatted[0].value,
        [debtBalanceId]: Number(debtBalanceDefault),
        [interestId]: Number(interestDefault).toFixed(2),
        [monthlyPaymentId]: Number(monthlyPaymentDefault),
    };
    const [input, setInput] = useState(defaultInput);
    const invalidInterest = input[interestId] < minInterest || input[interestId] > maxInterest;
    const invalidDebtBalance =
        input[debtBalanceId] < minDebtBalance || input[debtBalanceId] > maxDebtBalance;
    let totalDebtBalance;
    const invalidMonthlyPayment =
        input[monthlyPaymentId] < minMonthlyPayment || input[monthlyPaymentId] > maxMonthlyPayment;
    const invalidInput = invalidInterest || invalidDebtBalance || invalidMonthlyPayment;
    const [bills, setBills] = useState([]);
    const editModeOn = bills.findIndex((bill) => bill.isOpen) !== -1;
    const [editModeOverride, setEditModeOverride] = useState(false);

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        if (name === debtBalanceId || name === monthlyPaymentId) {
            value = Number(removeSymbols(value));
        } else if (name === interestId) {
            value = Number(removeSymbols(value)).toFixed(2);
        }

        setInput({
            ...input,
            [name]: value,
        });
    };

    const saveBill = () => {
        if (bills.findIndex((bill) => bill.id === input.id) === -1) {
            if (editModeOverride) {
                // If no form was open, don't save anything
                return bills;
            } else {
                // If the form for adding a brand new bill was open (i.e. the user was not editing
                // an existing bill), add a brand new bill
                let newBills;

                if (bills.length > 0) {
                    newBills = [...bills];
                } else {
                    newBills = [];
                }

                const bill = { ...input, id: uuidv4(), isOpen: false };
                newBills.push(bill);

                return newBills;
            }
        } else {
            // If the user was editing an existing bill, update that bill
            return bills.map((bill) => {
                if (bill.id === input.id) {
                    return {
                        id: input.id,
                        isOpen: false,
                        [debtTypeId]: input[debtTypeId],
                        [debtBalanceId]: input[debtBalanceId],
                        [interestId]: input[interestId],
                        [monthlyPaymentId]: input[monthlyPaymentId],
                    };
                } else {
                    return bill;
                }
            });
        }
    };

    const addBill = () => {
        setEditModeOverride(false);

        const bills = saveBill();
        setBills(bills);

        // Set the form input to all default values
        setInput(defaultInput);
    };

    const editBill = (id) => {
        setEditModeOverride(false);

        const bills = saveBill();

        // Set the form input to show info for the bill that the user now wants to edit
        const bill = bills.find((bill) => bill.id === id);

        setInput({
            id: id,
            [debtTypeId]: bill[debtTypeId],
            [debtBalanceId]: bill[debtBalanceId],
            [interestId]: bill[interestId],
            [monthlyPaymentId]: bill[monthlyPaymentId],
        });

        // Set isOpen to true for the bill that the user now wants to edit, and to false for all
        // other bills
        const newBills = bills.map((bill) => {
            bill.isOpen = bill.id === id;
            return bill;
        });
        setBills(newBills);
    };

    const deleteBill = (id) => {
        // If the user deletes the bill they were just editing, editModeOverride is set to true so
        // that no form is shown and the user can only see saved (collapsed) bills
        if (bills.find((bill) => bill.id === id).isOpen) {
            setEditModeOverride(true);
            setInput(defaultInput);
        }

        const newBills = bills.filter((bill) => bill.id !== id);
        setBills(newBills);
    };

    const getResults = () => {
        const newBillIsOpen = !(editModeOn || editModeOverride);
        let finalBills;

        if (newBillIsOpen) {
            // If the form for adding a brand new bill was open, include the live form input in the
            // calculations as an additional bill
            const newBill = {
                [debtBalanceId]: input[debtBalanceId],
                [interestId]: input[interestId],
                [monthlyPaymentId]: input[monthlyPaymentId],
            };
            finalBills = bills.concat(newBill);
        } else {
            // If the form for adding a brand new bill was NOT open, there are 2 cases: the user
            // was editing a bill, or the user wasn't editing a bill:
            if (editModeOn) {
                // If the user was editing a bill (i.e. a form was open), update that bill with the
                // live form input
                finalBills = bills.map((bill) => {
                    if (bill.id === input.id) {
                        return {
                            [debtBalanceId]: input[debtBalanceId],
                            [interestId]: input[interestId],
                            [monthlyPaymentId]: input[monthlyPaymentId],
                        };
                    } else {
                        return bill;
                    }
                });
            } else {
                // If the user was not editing a bill (i.e. no form was open), don't use any live
                // form input data in the calculations
                finalBills = bills;
            }
        }

        const currentLoanAmount = finalBills.reduce(
            (accumulator, currentValue) => accumulator + currentValue[debtBalanceId],
            0
        );
        totalDebtBalance = currentLoanAmount;
        const currentMonthlyPayment = finalBills.reduce(
            (accumulator, currentValue) => accumulator + currentValue[monthlyPaymentId],
            0
        );
        const currentLoanTerms = finalBills.map((bill) => {
            const monthlyPayment = bill[monthlyPaymentId];
            const balance = bill[debtBalanceId];
            const interestRate = bill[interestId] / 100 / 12;

            return (
                (Math.log(monthlyPayment) - Math.log(monthlyPayment - balance * interestRate)) /
                Math.log(1 + interestRate)
            );
        });
        const newLoanTerm = Math.ceil(Math.min(60, Math.max(...currentLoanTerms)));
        const defaultInterestRate = 32.99 / 100 / 12;
        const newMonthlyPayment =
            (currentLoanAmount * defaultInterestRate) /
            (1 - Math.pow(1 + defaultInterestRate, -1 * newLoanTerm));
        const annualSavings = (currentMonthlyPayment - newMonthlyPayment) * 12;
        const totalSavings = (currentMonthlyPayment - newMonthlyPayment) * newLoanTerm;

        if (
            invalidInput ||
            totalDebtBalance > maxTotalDebtBalance ||
            isNaN(newMonthlyPayment) ||
            isNaN(annualSavings) ||
            isNaN(newLoanTerm)
        ) {
            return {
                showGraph: false,
                newMonthlyPayment: 0,
                annualSavings: 0,
                totalSavings: 0,
                newLoanTerm: 0,
            };
        } else if (annualSavings < 0) {
            return {
                showGraph: false,
                newMonthlyPayment: Math.round(newMonthlyPayment),
                annualSavings: 0,
                totalSavings: 0,
                newLoanTerm: newLoanTerm,
            };
        } else {
            return {
                showGraph: true,
                newMonthlyPayment: Math.round(newMonthlyPayment),
                annualSavings: Math.round(annualSavings),
                totalSavings: Math.round(totalSavings),
                newLoanTerm: newLoanTerm,
            };
        }
    };

    const results = getResults();
    const invalidTotalDebtBalance = totalDebtBalance > maxTotalDebtBalance;
    const currentLoanTerm = 56; // TODO: replace hardcoded value with calculation
    const lineData = [
        {
            label: t('Consolidated with KG Bank'),
            data: [
                {
                    x: 0,
                    y: results.showGraph ? totalDebtBalance : null,
                },
                {
                    x: results.newLoanTerm,
                    y: results.showGraph ? 0 : null,
                },
            ],
            borderColor: '#41b9e6',
            backgroundColor: 'rgba(65, 185, 230, 1)',
        },
        {
            label: t('Current loans'),
            data: [
                {
                    x: 0,
                    y: results.showGraph ? totalDebtBalance : null,
                },
                {
                    x: currentLoanTerm,
                    y: results.showGraph ? 0 : null,
                },
            ],
            borderColor: '#ff6754',
            backgroundColor: 'rgba(255, 103, 84, 0.46)',
        },
    ];

    const form = (
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
            <SelectInput
                containerClassName={styles['input-container--regular']}
                fieldClassName={styles['select-field']}
                handleInputChange={handleInputChange}
                helpTextId=""
                id={debtTypeId}
                isInvalid={false}
                options={debtTypeOptionsFormatted}
                subtitle=""
                subtitleClassName={styles.subtitle}
                title={debtTypeTitle}
                value={input[debtTypeId]}
            />
            <TextInput
                containerClassName={styles['input-container--regular']}
                errorMessage={debtBalanceErrorMessage}
                fieldClassName={styles['text-field']}
                handleInputChange={handleInputChange}
                helpTextId={debtBalanceHelpTextId}
                id={debtBalanceId}
                isInvalid={invalidDebtBalance}
                mask={currencyMask}
                subtitle={debtBalanceSubtitle}
                subtitleClassName={styles.subtitle}
                title={debtBalanceTitle}
                value={input[debtBalanceId]}
            />
            <TextInput
                containerClassName={styles['input-container--regular']}
                errorMessage={interestErrorMessage}
                fieldClassName={styles['text-field']}
                handleInputChange={handleInputChange}
                helpTextId={interestHelpTextId}
                id={interestId}
                isInvalid={invalidInterest}
                mask={percentageMask}
                subtitle={interestSubtitle}
                subtitleClassName={styles.subtitle}
                title={interestTitle}
                value={input[interestId]}
            />
            <TextInput
                containerClassName={styles['input-container--regular']}
                errorMessage={monthlyPaymentErrorMessage}
                fieldClassName={styles['text-field']}
                handleInputChange={handleInputChange}
                helpTextId={monthlyPaymentHelpTextId}
                id={monthlyPaymentId}
                isInvalid={invalidMonthlyPayment}
                mask={currencyMask}
                subtitle={monthlyPaymentSubtitle}
                subtitleClassName={styles.subtitle}
                title={monthlyPaymentTitle}
                value={input[monthlyPaymentId]}
            />
        </form>
    );

    const savedBills = bills.map((bill, index) => {
        const getLabelId = (id) => `${bill.id}-${id}`;

        const debtTypeLabelId = getLabelId(debtTypeId);
        const debtType = debtTypeOptionsFormatted.find(
            (debtType) => debtType.value === bill[debtTypeId]
        ).name;

        const debtBalanceLabelId = getLabelId(debtBalanceId);
        const debtBalance = t('${0}', [bill[debtBalanceId].toLocaleString()]);

        const interestLabelId = getLabelId(interestId);
        const interest = t('{0}%', [bill[interestId]]);

        const monthlyPayment = t('${0}', [bill[monthlyPaymentId]]);
        const monthlyPaymentLabelId = getLabelId(monthlyPaymentId);

        return (
            <div key={bill.id} className={styles.bill}>
                <div className={styles['bill-heading-container']}>
                    <div className={styles['bill-heading-text']}>
                        <h3 className={styles['bill-heading']}>{t('Bill {0}', [index + 1])}</h3>
                        {bill.isOpen || (
                            <button
                                className={cx(styles['bill-edit-button'], {
                                    [styles['bill-edit-button--disabled']]: invalidInput,
                                })}
                                disabled={invalidInput}
                                onClick={() => editBill(bill.id)}
                            >
                                {t('Edit')}
                            </button>
                        )}
                    </div>
                    {((editModeOn || editModeOverride) && bills.length === 1) || (
                        <Icon
                            className={styles['bill-delete-button']}
                            onClick={() => deleteBill(bill.id)}
                            size="x-small"
                            url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/cross.svg"
                        />
                    )}
                </div>
                {bill.isOpen ? (
                    form
                ) : (
                    <div className={styles['bill-items']}>
                        <div className={styles['bill-item']}>
                            <h4 className={styles['bill-item-title']} id={debtTypeLabelId}>
                                {debtTypeTitle}
                            </h4>
                            <div
                                aria-labelledby={debtTypeLabelId}
                                className={styles['bill-item-value']}
                            >
                                {debtType}
                            </div>
                        </div>
                        <div className={styles['bill-item']}>
                            <h4 className={styles['bill-item-title']} id={debtBalanceLabelId}>
                                {debtBalanceTitle}
                            </h4>
                            <div
                                aria-labelledby={debtBalanceLabelId}
                                className={styles['bill-item-value']}
                            >
                                {debtBalance}
                            </div>
                        </div>
                        <div className={styles['bill-item']}>
                            <h4 className={styles['bill-item-title']} id={interestLabelId}>
                                {interestTitle}
                            </h4>
                            <div
                                aria-labelledby={interestLabelId}
                                className={styles['bill-item-value']}
                            >
                                {interest}
                            </div>
                        </div>
                        <div className={styles['bill-item']}>
                            <h4 className={styles['bill-item-title']} id={monthlyPaymentLabelId}>
                                {monthlyPaymentTitle}
                            </h4>
                            <div
                                aria-labelledby={monthlyPaymentLabelId}
                                className={styles['bill-item-value']}
                            >
                                {monthlyPayment}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    });

    const getResultElement = (headingId, heading, value, unit) => (
        <div className={styles['results-numbers-item']}>
            <h4 className={styles['results-numbers-heading']} id={headingId}>
                {heading}
            </h4>
            <div aria-labelledby={headingId} className={styles['results-numbers-value']}>
                {value}
                {unit && <span className={styles['results-numbers-unit']}>{unit}</span>}
            </div>
        </div>
    );

    return (
        <div className={styles.root} ref={rootRef}>
            <div className={cx('light-theme', styles['bills-container'])}>
                {invalidTotalDebtBalance && (
                    <div className={styles['error-message-container']}>
                        <Icon
                            className={styles['error-message-icon']}
                            embedSVG={true}
                            size="x-small"
                            url="/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/attention.svg"
                        />
                        <div className={styles['error-message-text']}>
                            {totalDebtBalanceErrorMessage}
                        </div>
                    </div>
                )}
                {savedBills}
                {editModeOn || editModeOverride || (
                    <div className={styles.bill}>
                        <div className={styles['bill-heading-container']}>
                            <div className={styles['bill-heading-text']}>
                                <h3 className={styles['bill-heading']}>
                                    {t('Bill {0}', [bills.length + 1])}
                                </h3>
                            </div>
                        </div>
                        {form}
                    </div>
                )}
                <button
                    className={cx(styles['add-bill-button'], {
                        [styles['add-bill-button--disabled']]:
                            invalidInput || invalidTotalDebtBalance,
                    })}
                    disabled={invalidInput || invalidTotalDebtBalance}
                    onClick={addBill}
                >
                    + {newBillText}
                </button>
            </div>
            <div className={cx('dark-theme', styles['results-container'])}>
                <h3 className={styles['results-title']}>{t('Balance chart')}</h3>
                <LineGraph
                    altText={t('Debt consolidation balance chart')}
                    lineData={lineData}
                    horizontalLineValue={totalDebtBalance}
                />
                <div className={styles['results-numbers-container']}>
                    {getResultElement(
                        'debt-calculator-new-payments-result',
                        t('New payments'),
                        t('${0}', [results.newMonthlyPayment]),
                        t(' /month')
                    )}
                    {getResultElement(
                        'debt-calculator-annual-savings-result',
                        results.totalSavings < results.annualSavings
                            ? t('Total savings of')
                            : t('Annual Savings of'),
                        t('${0}', [Math.min(results.totalSavings, results.annualSavings)]),
                        ''
                    )}
                    {getResultElement(
                        'debt-calculator-loan-term-result',
                        t('Loans paid off in'),
                        results.newLoanTerm,
                        t(' months')
                    )}
                </div>
                {ctaLinkText && ctaLinkUrl && (
                    <Button
                        altText={ctaLinkAltText || undefined}
                        className={styles.cta}
                        linkText={ctaLinkText}
                        linkType={ctaLinkType}
                        linkUrl={ctaLinkUrl}
                    />
                )}
                {!!window.print && downloadText && (
                    <button className={styles['download-cta']} onClick={handlePrint}>
                        {downloadText}
                    </button>
                )}
            </div>
        </div>
    );
};

DebtConsolidationCalculator.displayName = 'DebtConsolidationCalculator';

DebtConsolidationCalculator.propTypes = {
    ctaLinkAltText: PropTypes.string,
    ctaLinkText: PropTypes.string,
    ctaLinkType: PropTypes.oneOf(LINK_TYPES),
    ctaLinkUrl: PropTypes.string,
    debtBalanceDefault: PropTypes.string.isRequired,
    debtBalanceErrorMessage: PropTypes.string.isRequired,
    debtBalanceSubtitle: PropTypes.string,
    debtBalanceTitle: PropTypes.string.isRequired,
    debtTypeOptions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    debtTypeTitle: PropTypes.string.isRequired,
    downloadText: PropTypes.string,
    interestDefault: PropTypes.string.isRequired,
    interestErrorMessage: PropTypes.string.isRequired,
    interestSubtitle: PropTypes.string,
    interestTitle: PropTypes.string.isRequired,
    monthlyPaymentDefault: PropTypes.string.isRequired,
    monthlyPaymentErrorMessage: PropTypes.string.isRequired,
    monthlyPaymentSubtitle: PropTypes.string,
    monthlyPaymentTitle: PropTypes.string.isRequired,
    newBillText: PropTypes.string.isRequired,
    totalDebtBalanceErrorMessage: PropTypes.string.isRequired,
};

DebtConsolidationCalculator.defaultProps = {
    debtBalanceDefault: '3000',
    debtBalanceErrorMessage: t('Please enter a number between 100 and 20,000.'),
    debtBalanceSubtitle: t('Min - $100, Max - $20,000'),
    debtBalanceTitle: t('Balance owing'),
    debtTypeTitle: t('Debt type'),
    interestDefault: (15.0).toFixed(2),
    interestErrorMessage: t('Please enter a number between 0 and 60.'),
    interestSubtitle: t('Interest rate on this bill'),
    interestTitle: t('Interest'),
    monthlyPaymentDefault: '100',
    monthlyPaymentErrorMessage: t('Please enter a number between 10 and 999.'),
    monthlyPaymentSubtitle: t('The amount you pay every month.'),
    monthlyPaymentTitle: t('Monthly payment'),
    newBillText: t('Add another bill'),
    totalDebtBalanceErrorMessage: t('Total balance amounts cannot exceed $20,000.'),
};

export default DebtConsolidationCalculator;
