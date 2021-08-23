import './lib/polyfills';
import 'reset-css';
import './styles/index.scss';
import { defineCustomElements } from '@konrad/reweb-core';
import * as componentMap from './components';
defineCustomElements(componentMap, { prefix: 'kg' });
