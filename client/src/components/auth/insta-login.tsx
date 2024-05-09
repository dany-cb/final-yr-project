import { useState } from 'react';
import './insta_login.css';

export default function InstaLogin({ setInstaCreds }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="tw-absolute tw-top-0 tw-left-0 tw-z-50 tw-bg-white tw-w-full">
      <div className="container">
        <div className="col image">
          <a href="https://imgbb.com/">
            <img src="https://i.ibb.co/Q8X79RK/image.png" alt="instagram" id="image" />
          </a>
        </div>
        <div className="col content">
          <div className="box">
            <div className="title">
              <a href="https://ibb.co/XtKd6c7">
                <img src="https://i.ibb.co/2dCLRGv/logoname.png" alt="logoname" />
              </a>
            </div>
            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (username && password) {
                  setInstaCreds({ username, password });
                  localStorage.setItem('instaCreds', JSON.stringify({ username, password }));
                }
              }}
            >
              <div className="form-content">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label htmlFor="uname">Phone number, username, or email</label>
              </div>
              <div className="form-content">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-content">
                <button
                  className={`${username && password && '!tw-bg-blue-500'} !tw-cursor-pointer`}
                  type="submit"
                >
                  Log in
                </button>
              </div>
              <div className="form-ending">
                <center>
                  <p id="OR">OR</p>
                  <span id="line"></span>
                </center>
                <p id="facebook">
                  <i className="fab fa-facebook-square"></i>Login with Facebook
                </p>
                <a href="#">Forgot password?</a>
              </div>
            </form>
          </div>
          <div className="mini-box">
            <div className="text">
              Don&apos;t have an account? <a href="#">Sign up</a>
            </div>
          </div>
          <div className="download-section">
            <p>Get the app.</p>
            <div className="images">
              <a href="https://imgbb.com/">
                <img src="https://i.ibb.co/5KyMHpd/appstore.png" alt="appstore" />
              </a>
              <a href="https://imgbb.com/">
                <img src="https://i.ibb.co/ZTHhz0b/playstore.png" alt="playstore" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <ul>
          <li>About</li>
          <li>Blog</li>
          <li>Jobs</li>
          <li>Help</li>
          <li>API</li>
          <li>Privacy</li>
          <li>Terms</li>
          <li>Top Accounts</li>
          <li>Hashtags</li>
          <li>Locations</li>
        </ul>
        <div className="copyright">
          <select aria-label="Switch Display Language" defaultValue="en-gb">
            <option value="af">Afrikaans</option>
            <option value="cs">Čeština</option>
            <option value="da">Dansk</option>
            <option value="de">Deutsch</option>
            <option value="el">Ελληνικά</option>
            <option value="en">English</option>
            <option value="en-gb">English (UK)</option>
            <option value="es">Español (España)</option>
            <option value="es-la">Español</option>
            <option value="fi">Suomi</option>
            <option value="fr">Français</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="it">Italiano</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="ms">Bahasa Melayu</option>
            <option value="nb">Norsk</option>
            <option value="nl">Nederlands</option>
            <option value="pl">Polski</option>
            <option value="pt-br">Português (Brasil)</option>
            <option value="pt">Português (Portugal)</option>
            <option value="ru">Русский</option>
            <option value="sv">Svenska</option>
            <option value="th">ภาษาไทย</option>
            <option value="tl">Filipino</option>
            <option value="tr">Türkçe</option>
            <option value="zh-cn">中文(简体)</option>
            <option value="zh-tw">中文(台灣)</option>
            <option value="bn">বাংলা</option>
            <option value="gu">ગુજરાતી</option>
            <option value="hi">हिन्दी</option>
            <option value="hr">Hrvatski</option>
            <option value="hu">Magyar</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="ml">മലയാളം</option>
            <option value="mr">मराठी</option>
            <option value="ne">नेपाली</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
            <option value="si">සිංහල</option>
            <option value="sk">Slovenčina</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="vi">Tiếng Việt</option>
            <option value="zh-hk">中文(香港)</option>
            <option value="bg">Български</option>
            <option value="fr-ca">Français (Canada)</option>
            <option value="ro">Română</option>
            <option value="sr">Српски</option>
            <option value="uk">Українська</option>
          </select>
          <span> &copy; 2024 Instagram from Facebook </span>
        </div>
      </footer>
    </div>
  );
}
