import { useEffect, useRef } from 'react';

const SmartfitButton = ({ ean }) => {
  const ozContainer = useRef();

  const OZ_CONFIG = {
    settings: {
      apiKey: process.env.SMARTFIT_API_KEY,
      language: 'en',
    },
    events: {},
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
    );
  }, []);

  useEffect(() => {
    if (typeof window == 'undefined') return;
    if (!window?.oz?.destroy || !ozContainer.current) return;
    if (!ean) return window.oz.destroy();

    window.oz.destroy();
    window.oz.initialize();
  }, [ean]);

  return (
    <>
      <button
        id='my-custom-oz-button'
        ref={ozContainer}
        className='oz-trigger'
        data-oz-widget-type='sizing'
        data-oz-code={ean}
        data-oz-name='Flying Pigeon'
        data-oz-image='https://upload.wikimedia.org/wikipedia/commons/4/41/Left_side_of_Flying_Pigeon.jpg'
        data-oz-fullscreen='true'
        style={{ maxWidth: '150px' }}
      >
        What's my size?
      </button>
    </>
  );
};

export default SmartfitButton;
