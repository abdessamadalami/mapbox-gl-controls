import mapboxgl from 'mapbox-gl';
import Prism from 'prismjs';
import { LocalizationControl } from '../../lib/index';

export default () => {
  const map = new mapboxgl.Map({
    container: 'localization-map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 3,
    center: [30.5234, 50.4501],
    scrollZoom: false,
  });
  const codeComment = document.querySelector('#localization-comment-code');
  const setCode = (locale = '') => {
    const code = document.querySelector('#localization-code');
    if (locale !== '') locale = `'${locale}'`;
    code.textContent =
`import { LocalizationControl } from 'mapbox-gl-controls';

map.addControl(new LocalizationControl(${locale}));`;
    Prism.highlightElement(code);
  };

  map.addControl(new LocalizationControl());

  map.on('load', function () {
    const radio = document.querySelectorAll('[name="language"]');
    [].forEach.call(radio, (r) => {
      r.addEventListener('change', (event) => {
        const value = event.target.value;
        if (value === 'browser') {
          map.setLanguage();
          setCode();
        } else {
          map.setLanguage(value);
          setCode(value);
        }
      });
    });
  });

  setCode();
  codeComment.textContent =
`// Is is possible to change language dynamically after component has been added:
map.setLanguage(language);`;
  Prism.highlightElement(codeComment);
};
