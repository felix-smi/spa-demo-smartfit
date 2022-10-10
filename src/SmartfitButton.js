import { useEffect, useRef } from 'react';

import './SmartfitButton.css';

const SmartfitButton = ({ ean }) => {
  const ozContainer = useRef();

  const showSizingButton = ({ id }) => {
    console.log('showSizingButton');
    if (ozContainer.current.classList.contains('hidden'))
      ozContainer.current.classList.remove('hidden');
  };

  const hideSizingButton = () => {
    console.log('hideSizingButton');
    if (!ozContainer.current.classList.contains('hidden'))
      ozContainer.current.classList.add('hidden');
  };

  const OZ_CONFIG = {
    settings: {
      apiKey: 'YOUR_API_KEY',
      language: 'en',
    },
    events: {
      sizingAvailable: {
        callback: showSizingButton,
      },
      sizingUnavailable: {
        callback: hideSizingButton,
      },
    },
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window?.oz) return;
    ((win, doc, script, key, config, src) => {
      win['___OnlineSizing'] = key;
      win['___OnlineSizingConfig'] = config;
      const js = doc.createElement(script);
      js.id = key;
      js.src = src;
      js.async = true;

      const scripts = doc.getElementsByTagName(script);
      const lastScript = scripts[scripts.length - 1];
      lastScript.parentNode.insertBefore(js, lastScript);
    })(
      window,
      document,
      'script',
      'oz',
      OZ_CONFIG,
      'https://staging-widgets.onlinesizing.bike/static/js/loader.js'
      // 'https://dev01-widgets.onlinesizing.bike/static/js/loader.js'
    );
  }, []);

  useEffect(() => {
    if (typeof window == 'undefined') return;
    if (!window?.oz?.updateWidgetConfigurations || !ozContainer.current) return;
    if (!ean) return;
    ozContainer.current.setAttribute(`data-${window.oz.namespace}-code`, ean);
    window.oz.updateWidgetConfigurations([ozContainer.current]);
  }, [ean]);

  return (
    <>
      <button
        id='my-custom-oz-button'
        ref={ozContainer}
        className='oz-trigger hidden'
        data-oz-widget-type='sizing'
        data-oz-code={ean}
        data-oz-name='Flying Pigeon'
        data-oz-image='https://upload.wikimedia.org/wikipedia/commons/4/41/Left_side_of_Flying_Pigeon.jpg'
        data-oz-fullscreen='true'
        style={{ maxWidth: '150px' }}
      >
        Find my size
      </button>
    </>
  );
};

export default SmartfitButton;
