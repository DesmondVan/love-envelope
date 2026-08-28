/* ============================================================
   🔐 PASSWORD.JS — Màn 1: Mật Khẩu
   ============================================================ */

class PasswordScene {
  constructor(onSuccess) {
    this.onSuccess = onSuccess;
    this.scene = document.getElementById('scene-password');
    this.input = document.getElementById('password-input');
    this.btn = document.getElementById('password-btn');
    this.lockIcon = document.getElementById('lock-icon');
    this.errorMsg = document.getElementById('password-error');
    this.attempts = 0;
  }

  init() {
    if (!this.scene) return;

    // Button click
    this.btn.addEventListener('click', () => this.checkPassword());

    // Enter key
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.checkPassword();
    });

    // Clear error on input
    this.input.addEventListener('input', () => {
      this.errorMsg.textContent = '';
      this.input.classList.remove('error');
    });
  }

  normalizeString(str) {
    // Remove diacritics and convert to lowercase
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  checkPassword() {
    const inputVal = this.input.value;
    const normalizedInput = this.normalizeString(inputVal);
    const normalizedPassword = this.normalizeString(CONFIG.password);

    // Also check exact match (with diacritics)
    const exactMatch = inputVal.toLowerCase().trim() === CONFIG.password.toLowerCase().trim();

    if (exactMatch || normalizedInput === normalizedPassword) {
      this.handleSuccess();
    } else {
      this.handleFailure();
    }
  }

  handleSuccess() {
    // Lock unlock animation
    this.lockIcon.textContent = '🔓';
    this.lockIcon.classList.remove('shake');
    this.lockIcon.classList.add('unlocked');
    this.errorMsg.textContent = '';
    this.input.disabled = true;
    this.btn.disabled = true;

    // Transition after animation
    setTimeout(() => {
      this.onSuccess();
    }, 900);
  }

  handleFailure() {
    this.attempts++;
    
    // Shake lock
    this.lockIcon.classList.remove('shake');
    void this.lockIcon.offsetWidth; // Force reflow
    this.lockIcon.classList.add('shake');

    // Shake input
    this.input.classList.remove('error');
    void this.input.offsetWidth;
    this.input.classList.add('error');

    // Error messages
    const messages = [
      'Sai rồi nè~ thử lại đi 😜',
      'Vẫn sai kìa~ nghĩ kỹ lại nha 🤔',
      'Gợi ý rõ vậy mà 😅',
      'Cố lên~ gần đúng rồi đó 💪',
      'Anh tin em biết mà 💕',
    ];
    this.errorMsg.textContent = messages[Math.min(this.attempts - 1, messages.length - 1)];

    // Clear input
    this.input.value = '';
    this.input.focus();
  }
}
