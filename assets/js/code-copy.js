/**
 * Accessible Code Block Copy Utility
 * Provides keyboard-accessible, zero-dependency copy buttons with live ARIA announcements.
 */
(function () {
  'use strict';

  function initCopyButtons() {
    const codeBlocks = document.querySelectorAll('.post-content pre, article pre');
    codeBlocks.forEach(function (pre) {
      // Avoid duplicate wrappers if initialized multiple times
      if (pre.parentElement && pre.parentElement.classList.contains('code-block-wrapper')) {
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'copy-code-btn';
      copyBtn.setAttribute('aria-label', 'Copy code snippet to clipboard');
      copyBtn.innerHTML = '<span class="copy-status" aria-live="polite">Copy</span>';

      copyBtn.addEventListener('click', async function () {
        const code = pre.querySelector('code');
        const text = code ? code.innerText : pre.innerText;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
          } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
          }

          const status = copyBtn.querySelector('.copy-status');
          status.textContent = 'Copied!';
          copyBtn.classList.add('copied');

          setTimeout(function () {
            status.textContent = 'Copy';
            copyBtn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Clipboard copy failed: ', err);
        }
      });

      wrapper.appendChild(copyBtn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    initCopyButtons();
  }
})();
