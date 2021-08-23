import React from 'react';
import Carousel from './Carousel';
import Card from '../Card';
import SectionContainer from '../../SectionContainer';
import Text from '../Text';
import Theme from '../Theme';
import { lorem } from '../../../lib/helpers/lorem';
import { select } from '@storybook/addon-knobs';
import { THEME_OPTIONS } from '../../../lib/constants';

// https://storybook.js.org/docs/formats/component-story-format/

export default {
    title: 'Elements/Carousel',
    component: Carousel,
};

export const DefaultView = () => {
    return (
        <Theme theme={select('Theme of Parent Component', THEME_OPTIONS, 'light')}>
            <SectionContainer
                backgroundColor={
                    select('Theme of Parent Component', THEME_OPTIONS, 'light') === 'light'
                        ? 'white'
                        : 'darkPurple'
                }
                width="full"
            >
                <Carousel>
                    <Card>
                        <Text
                            content={`<p>${lorem.generateParagraphs(
                                1
                            )} <a href='/' >Sample Link 1</a></p>`}
                        />
                    </Card>
                    <Card>
                        <Text
                            content={`<p>${lorem.generateParagraphs(
                                1
                            )} <a href='/'>Sample Link 2</a></p>`}
                        />
                    </Card>
                    <Card>
                        <Text
                            content={`<p>${lorem.generateParagraphs(
                                1
                            )} <a href='/'>Sample Link 3</a></p>`}
                        />
                    </Card>
                    <Card>
                        <Text
                            content={`<p>${lorem.generateParagraphs(
                                1
                            )} <a href='/'>Sample Link 4</a></p>`}
                        />
                    </Card>
                    <Card>
                        <Text
                            content={`<p>${lorem.generateParagraphs(
                                1
                            )} <a href='/'>Sample Link 5</a></p>`}
                        />
                    </Card>
                    <Card>
                        <Text
                            content={`<p>${lorem.generateParagraphs(
                                1
                            )} <a href='/'>Sample Link 6</a></p>`}
                        />
                    </Card>
                    <Card>
                        <Text
                            content={`<p>${lorem.generateParagraphs(
                                1
                            )} <a href='/'>Sample Link 7</a></p>`}
                        />
                    </Card>
                </Carousel>
            </SectionContainer>
        </Theme>
    );
};
