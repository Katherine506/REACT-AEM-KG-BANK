import React, { useEffect, useRef, useState } from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { useReactToPrint } from 'react-to-print';
import { t } from '@konrad/reweb-aem';
import PropTypes from 'prop-types';
import { Button, SelectInput, TextInput } from '../index';
import styles from './LoanPaymentCalculator.module.scss';
import cx from 'classnames';
import { getHelpTextId, removeSymbols } from '../../lib/helpers/form';
import { CURRENCY_MASK_OPTIONS, LINK_TYPES, PROVINCES } from '../../lib/constants';

const LoanPaymentCalculator = (props) => {
    const {
        amountDefault,
        amountSubtitle,
        amountTitle,
        borrowingOption1,
        borrowingOption1Description,
        borrowingOption2,
        borrowingOption2Description,
        borrowingOption3,
        borrowingOption3Description,
        borrowingTitle,
        ctaLinkAltText,
        ctaLinkText,
        ctaLinkType,
        ctaLinkUrl,
        downloadText,
        frequencySubtitle,
        frequencyTitle,
        homeownerValue,
        loanTermSubtitle,
        loanTermTitle,
        loanTypeSubtitle,
        loanTypeTitle,
        nonHomeownerValue,
        provinceSubtitle,
        provinceTitle,
        resultsSubtitle,
        resultsTitle,
        userTypeTitle,
        userTypeSubtitle,
    } = props;
    const rootRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => rootRef.current,
    });

    const currencyMask = createNumberMask(CURRENCY_MASK_OPTIONS);

    const loanTypeId = 'loan-type';
    const loanTypeHelpTextId = getHelpTextId(loanTypeId);
    const loanTypeOptions = [
        {
            name: t('Unsecured personal loan'),
            value: 'upl',
        },
        {
            name: t('Secured personal loan'),
            value: 'spl',
        },
    ];
    const userTypeId = 'user-type';
    const userTypeHelpTextId = getHelpTextId(userTypeId);
    const getUserTypeOptions = (loanType) => {
        if (loanType === 'upl') {
            return [
                {
                    name: homeownerValue,
                    value: 'homeowner',
                },
                {
                    name: nonHomeownerValue,
                    value: 'renter',
                },
            ];
        } else {
            return [
                {
                    name: homeownerValue,
                    value: 'homeowner',
                },
            ];
        }
    };
    const amountId = 'amount';
    const amountHelpTextId = getHelpTextId(amountId);
    const frequencyId = 'frequency';
    const frequencyHelpTextId = getHelpTextId(frequencyId);
    const frequencyOptions = [
        {
            name: t('Monthly'),
            value: 'monthly',
            numPeriodsPerYear: 12,
        },
        {
            name: t('Semi-monthly'),
            value: 'semi-monthly',
            numPeriodsPerYear: 24,
        },
        {
            name: t('Bi-weekly'),
            value: 'bi-weekly',
            numPeriodsPerYear: 26,
        },
    ];
    const provinceId = 'province';
    const provinceHelpTextId = getHelpTextId(provinceId);
    const borrowingId = 'borrowing';
    const borrowingDescriptionId = 'borrowing-description';
    const borrowingOptions = [
        {
            name: borrowingOption1,
            value: 'fair',
            description: borrowingOption1Description,
        },
        {
            name: borrowingOption2,
            value: 'good',
            description: borrowingOption2Description,
        },
        {
            name: borrowingOption3,
            value: 'excellent',
            description: borrowingOption3Description,
        },
    ];
    const loanTermId = 'loan-term';
    const loanTermHelpTextId = getHelpTextId(loanTermId);
    const loanTerms = {
        upl: [
            {
                min: 300,
                max: 1999,
                months: [12, 24, 36],
            },
            {
                min: 2000,
                max: 4999,
                months: [12, 24, 36, 48],
            },
            {
                min: 5000,
                max: 20000,
                months: [12, 24, 36, 48, 60],
            },
        ],
        spl: [
            {
                min: 300,
                max: 35000,
                months: [36, 48, 60, 72, 84, 96, 108, 120],
            },
        ],
    };
    const getLoanTermOptions = (amount, loanType) => {
        const term =
            loanTerms[loanType].find(
                (loanTerm) => amount >= loanTerm.min && amount <= loanTerm.max
            ) || loanTerms[loanType][loanTerms[loanType].length - 1];

        return term.months.map((month) => {
            return {
                name: t('{0} months', [month]),
                value: month,
            };
        });
    };
    const resultsId = 'loan-payment-results';
    const resultsHelpTextId = getHelpTextId(resultsId);

    const [input, setInput] = useState({
        [loanTypeId]: loanTypeOptions[0].value,
        [userTypeId]: getUserTypeOptions(loanTypeOptions[0].value)[0].value,
        [amountId]: Number(amountDefault),
        [frequencyId]: frequencyOptions[0].value,
        [provinceId]: PROVINCES[0].value,
        [borrowingId]: borrowingOptions[2].value,
        [loanTermId]: getLoanTermOptions(Number(amountDefault), loanTypeOptions[0].value)[0].value,
    });
    const [userTypeOptions, setUserTypeOptions] = useState(
        getUserTypeOptions(loanTypeOptions[0].value)
    );
    const [loanTermOptions, setLoanTermOptions] = useState(
        getLoanTermOptions(Number(amountDefault), loanTypeOptions[0].value)
    );
    const borrowingDescription = borrowingOptions.find(
        (option) => option.value === input[borrowingId]
    ).description;
    const getSPLInterestRate = (rate) => {
        // This function converts an interest rate from one compounding basis to another compounding basis

        const r1 = rate; // Interest rate for compounding basis 1
        const n1 = 2; // Compounding frequency for compounding basis 1
        const n2 = 12; // Compounding frequency for compounding basis 2

        return 12 * (Math.pow(1 + r1 / n1, n1 / n2) - 1); // Interest rate for compounding basis 2
    };
    const userTypeProperties = [
        {
            name: homeownerValue,
            value: 'homeowner',
            upl: {
                fair: {
                    rate: {
                        default: 0.3799,
                        manitoba: 0.3199,
                        quebec: 0.3499,
                    },
                    min: 300,
                    max: 9000,
                },
                good: {
                    rate: {
                        default: 0.3699,
                        manitoba: 0.3199,
                        quebec: 0.3499,
                    },
                    min: 300,
                    max: 12500,
                },
                excellent: {
                    rate: {
                        default: 0.3599,
                        manitoba: 0.3199,
                        quebec: 0.3499,
                    },
                    min: 300,
                    max: 20000,
                },
            },
            spl: {
                fair: {
                    rate: {
                        default: getSPLInterestRate(0.2399),
                    },
                    min: 300,
                    max: 25000,
                },
                good: {
                    rate: {
                        default: getSPLInterestRate(0.2299),
                    },
                    min: 300,
                    max: 30000,
                },
                excellent: {
                    rate: {
                        default: getSPLInterestRate(0.2199),
                    },
                    min: 300,
                    max: 35000,
                },
            },
        },
        {
            name: nonHomeownerValue,
            value: 'renter',
            upl: {
                fair: {
                    rate: {
                        default: 0.3999,
                        manitoba: 0.3199,
                        quebec: 0.3499,
                    },
                    min: 300,
                    max: 7500,
                },
                good: {
                    rate: {
                        default: 0.3899,
                        manitoba: 0.3199,
                        quebec: 0.3499,
                    },
                    min: 300,
                    max: 10000,
                },
                excellent: {
                    rate: {
                        default: 0.3899,
                        manitoba: 0.3199,
                        quebec: 0.3499,
                    },
                    min: 300,
                    max: 10000,
                },
            },
        },
    ];
    const getSelectedUserTypeProperties = (userType, loanType, borrowing) => {
        const selectedUserType = userTypeProperties.find((option) => option.value === userType);

        return selectedUserType[loanType] && selectedUserType[loanType][borrowing];
    };
    const [selectedUserTypeProperties, setSelectedUserTypeProperties] = useState(
        getSelectedUserTypeProperties(input[userTypeId], input[loanTypeId], input[borrowingId])
    );
    let rate;
    if (input[provinceId] === 'manitoba' && selectedUserTypeProperties.rate.manitoba) {
        rate = selectedUserTypeProperties.rate.manitoba;
    } else if (input[provinceId] === 'quebec' && selectedUserTypeProperties.rate.manitoba) {
        rate = selectedUserTypeProperties.rate.quebec;
    } else {
        rate = selectedUserTypeProperties.rate.default;
    }
    const minAmount = selectedUserTypeProperties.min;
    const maxAmount = selectedUserTypeProperties.max;
    const invalidAmount = input[amountId] < minAmount || input[amountId] > maxAmount;

    // This effect is used to update the user type properties, which in turn affect the values of
    // rate, minAmount, and maxAmount
    useEffect(() => {
        const newSelectedUserTypeProperties = getSelectedUserTypeProperties(
            input[userTypeId],
            input[loanTypeId],
            input[borrowingId]
        );

        if (newSelectedUserTypeProperties) {
            setSelectedUserTypeProperties(newSelectedUserTypeProperties);
        }
    }, [input[userTypeId], input[loanTypeId], input[borrowingId]]);

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = name === amountId ? Number(removeSymbols(target.value)) : target.value;

        setInput({
            ...input,
            [name]: value,
        });
    };

    const getRadioElements = (groupId, options) => {
        return options.map((option) => {
            const inputId = `${groupId}-${option.value}`;

            return (
                <div className={styles['radio-option']} key={option.value}>
                    <input
                        aria-describedby={borrowingDescriptionId}
                        defaultChecked={input[groupId] === option.value}
                        className={styles['radio-input']}
                        id={inputId}
                        name={groupId}
                        onChange={handleInputChange}
                        type="radio"
                        value={option.value}
                    />
                    <label className={styles['radio-button']} htmlFor={inputId}>
                        {option.name}
                    </label>
                </div>
            );
        });
    };

    const getLoanPayment = () => {
        const loanAmount = input[amountId];
        const annualInterestRate = rate;
        const selectedFrequency = frequencyOptions.find(
            (option) => option.value === input[frequencyId]
        );
        const numPeriodsPerYear = selectedFrequency.numPeriodsPerYear;
        const interestRatePerPeriod = annualInterestRate / numPeriodsPerYear;
        const numYears = Number(input[loanTermId]) / 12;
        const totalNumPeriods = numPeriodsPerYear * numYears;

        const loanPayment =
            (loanAmount * interestRatePerPeriod) /
            (1 - Math.pow(1 + interestRatePerPeriod, -1 * totalNumPeriods));

        return invalidAmount ? 0 : Math.floor(loanPayment);
    };

    // This effect is used to update the user type dropdown options
    useEffect(() => {
        (async function () {
            const newUserTypeOptions = getUserTypeOptions(input[loanTypeId]);

            await setUserTypeOptions(newUserTypeOptions);

            // Check whether the currently selected user type exists as one of the new user type
            // options. If not, set the dropdown to display the first of the new user type options
            const userType = newUserTypeOptions.find(
                (option) => option.value === input[userTypeId]
            );
            if (userType === undefined) {
                setInput({
                    ...input,
                    [userTypeId]: newUserTypeOptions[0].value,
                });
            }
        })();
    }, [input[loanTypeId]]);

    // This effect is used to update the loan term dropdown options
    useEffect(() => {
        if (!invalidAmount) {
            (async function () {
                const newLoanTermOptions = getLoanTermOptions(input[amountId], input[loanTypeId]);

                setLoanTermOptions(newLoanTermOptions);

                // Check whether the currently selected loan term exists as one of the new loan term
                // options. If not, set the dropdown to display the first of the new loan term options
                const loanTerm = newLoanTermOptions.find(
                    (option) => option.value === Number(input[loanTermId])
                );
                if (loanTerm === undefined) {
                    setInput({
                        ...input,
                        [loanTermId]: newLoanTermOptions[0].value,
                    });
                }
            })();
        }
    }, [input[amountId], input[loanTypeId], minAmount, maxAmount]);

    return (
        <div className={styles.root} ref={rootRef}>
            <form
                className={cx('light-theme', styles.form)}
                onSubmit={(event) => event.preventDefault()}
            >
                <SelectInput
                    containerClassName={styles['input-container--regular']}
                    fieldClassName={styles['select-field']}
                    handleInputChange={handleInputChange}
                    helpTextId={loanTypeHelpTextId}
                    id={loanTypeId}
                    isInvalid={false}
                    options={loanTypeOptions}
                    subtitle={loanTypeSubtitle}
                    subtitleClassName={styles.subtitle}
                    title={loanTypeTitle}
                    value={input[loanTypeId]}
                />
                <SelectInput
                    containerClassName={styles['input-container--regular']}
                    fieldClassName={styles['select-field']}
                    handleInputChange={handleInputChange}
                    helpTextId={userTypeHelpTextId}
                    id={userTypeId}
                    isInvalid={false}
                    options={userTypeOptions}
                    subtitle={userTypeSubtitle}
                    subtitleClassName={styles.subtitle}
                    title={userTypeTitle}
                    value={input[userTypeId]}
                />
                <TextInput
                    containerClassName={styles['input-container--regular']}
                    errorMessage={t('Enter a number between {0} and {1}', [
                        minAmount.toLocaleString(),
                        maxAmount.toLocaleString(),
                    ])}
                    fieldClassName={styles['text-field']}
                    handleInputChange={handleInputChange}
                    helpTextId={amountHelpTextId}
                    id={amountId}
                    isInvalid={invalidAmount}
                    mask={currencyMask}
                    subtitle={amountSubtitle}
                    subtitleClassName={styles.subtitle}
                    title={amountTitle}
                    value={input[amountId]}
                />
                <SelectInput
                    containerClassName={styles['input-container--regular']}
                    fieldClassName={styles['select-field']}
                    handleInputChange={handleInputChange}
                    helpTextId={frequencyHelpTextId}
                    id={frequencyId}
                    isInvalid={false}
                    options={frequencyOptions}
                    subtitle={frequencySubtitle}
                    subtitleClassName={styles.subtitle}
                    title={frequencyTitle}
                    value={input[frequencyId]}
                />
                <SelectInput
                    containerClassName={styles['input-container--regular']}
                    fieldClassName={styles['select-field']}
                    handleInputChange={handleInputChange}
                    helpTextId={provinceHelpTextId}
                    id={provinceId}
                    isInvalid={false}
                    options={PROVINCES}
                    subtitle={provinceSubtitle}
                    subtitleClassName={styles.subtitle}
                    title={provinceTitle}
                    value={input[provinceId]}
                />
                <div className={styles['input-container--borrowing']}>
                    <div className={styles.title}>{borrowingTitle}</div>
                    <div className={styles['radio-options-container']} role="group">
                        {getRadioElements(borrowingId, borrowingOptions)}
                    </div>
                    <div className={styles.description} id={borrowingDescriptionId}>
                        {borrowingDescription}
                    </div>
                </div>
                <SelectInput
                    containerClassName={styles['input-container--regular']}
                    fieldClassName={styles['select-field']}
                    handleInputChange={handleInputChange}
                    helpTextId={loanTermHelpTextId}
                    id={loanTermId}
                    isInvalid={false}
                    options={loanTermOptions}
                    subtitle={loanTermSubtitle}
                    subtitleClassName={styles.subtitle}
                    title={loanTermTitle}
                    value={input[loanTermId]}
                />
            </form>
            <div className={cx('dark-theme', styles['results-container'])}>
                <div className={styles['results-title']} id={resultsId}>
                    {resultsTitle}
                </div>
                <div
                    aria-describedby={resultsHelpTextId}
                    aria-labelledby={resultsId}
                    className={styles['results-payment']}
                >
                    {t('${0}', [getLoanPayment()])}
                    <span className={styles['results-payment-asterisk']}>*</span>
                </div>
                <div id={resultsHelpTextId} className={styles['results-subtitle']}>
                    <span>*</span>
                    {t('{0} {1}%', [resultsSubtitle, (100 * rate).toFixed(2)])}
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

LoanPaymentCalculator.displayName = 'LoanPaymentCalculator';

LoanPaymentCalculator.propTypes = {
    amountDefault: PropTypes.string.isRequired,
    amountSubtitle: PropTypes.string,
    amountTitle: PropTypes.string.isRequired,
    borrowingOption1: PropTypes.string.isRequired,
    borrowingOption1Description: PropTypes.string.isRequired,
    borrowingOption2: PropTypes.string.isRequired,
    borrowingOption2Description: PropTypes.string.isRequired,
    borrowingOption3: PropTypes.string.isRequired,
    borrowingOption3Description: PropTypes.string.isRequired,
    borrowingTitle: PropTypes.string.isRequired,
    ctaLinkAltText: PropTypes.string,
    ctaLinkText: PropTypes.string,
    ctaLinkType: PropTypes.oneOf(LINK_TYPES),
    ctaLinkUrl: PropTypes.string,
    downloadText: PropTypes.string,
    frequencySubtitle: PropTypes.string.isRequired,
    frequencyTitle: PropTypes.string.isRequired,
    homeownerValue: PropTypes.string.isRequired,
    loanTermSubtitle: PropTypes.string,
    loanTermTitle: PropTypes.string.isRequired,
    loanTypeSubtitle: PropTypes.string,
    loanTypeTitle: PropTypes.string.isRequired,
    nonHomeownerValue: PropTypes.string.isRequired,
    provinceSubtitle: PropTypes.string,
    provinceTitle: PropTypes.string.isRequired,
    resultsSubtitle: PropTypes.string,
    resultsTitle: PropTypes.string.isRequired,
    userTypeTitle: PropTypes.string.isRequired,
    userTypeSubtitle: PropTypes.string,
};

LoanPaymentCalculator.defaultProps = {
    amountDefault: '5000',
    amountSubtitle: t('How much you want to borrow'),
    amountTitle: t('Loan amount'),
    borrowingOption1: t('Fair'),
    borrowingOption1Description: t('Some late payments'),
    borrowingOption2: t('Good'),
    borrowingOption2Description: t('Some credit history, good to fair standing'),
    borrowingOption3: t('Excellent'),
    borrowingOption3Description: t('Well-established credit history, great standing'),
    borrowingTitle: t('Borrowing history'),
    frequencySubtitle: t('How often can you make payments?'),
    frequencyTitle: t('Payment frequency'),
    homeownerValue: t('Homeowner'),
    loanTermSubtitle: t('The time period you’ll need to pay back your loan'),
    loanTermTitle: t('Loan term'),
    loanTypeSubtitle: t('Is your loan secured or unsecured?'),
    loanTypeTitle: t('Loan type'),
    nonHomeownerValue: t('Renter'),
    provinceSubtitle: t('The province in which you live'),
    provinceTitle: t('Province'),
    resultsSubtitle: t('The estimated interest rate is '),
    resultsTitle: t('Estimated monthly loan payment'),
    userTypeTitle: t('Home ownership status'),
    userTypeSubtitle: t('Do you rent or own your home?'),
};

export default LoanPaymentCalculator;
