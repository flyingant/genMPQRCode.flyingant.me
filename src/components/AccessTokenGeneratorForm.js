/* eslint-disable react/no-unused-state */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';

class AccessTokenGeneratorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: {
        appId: 'aaaa',
        appSecret: 'aaa',
      },
      log: '',
    };
    this.generateAccessToken = this.generateAccessToken.bind(this);
  }

  async generateAccessToken() {
    const { log, accessToken } = this.state;
    const result = await axios.get(`https://api.flyingant.me/api/wechat/genToken?appId=${accessToken.appId}&appSecret=${accessToken.appSecret}`);
    this.setState({
      log: log.concat(`${JSON.stringify(result.data)}\n`),
    });
  }

  render() {
    const { log, accessToken } = this.state;
    return (
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col items-start justify-start p-4">
          <ul className="w-full h-full text-xs text-gray-500 flex flex-col items-start justify-center p-4 list-disc">
            <li>
              <b>appId</b> 小程序唯一凭证，即 AppID，可在「微信公众平台 - 设置 - 开发设置」页中获得。（需要已经成为开发者，且帐号没有异常状态）
            </li>
            <li>
              <b>appSecret</b> 小程序唯一凭证密钥，即 AppSecret，获取方式同 appid
            </li>
          </ul>
          <label className="w-full md:w-4/5 flex flex-col mb-4">
            <span className="text-gray-700">appid</span>
            <input
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
              type="text"
              onChange={(event) => {
                accessToken.appId = event.target.value;
                this.setState({
                  accessToken,
                });
              }}
            />
          </label>
          <label className="w-full md:w-4/5 flex flex-col mb-4">
            <span className="text-gray-700">appsecret</span>
            <input
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
              type="text"
              onChange={(event) => {
                accessToken.appSecret = event.target.value;
                this.setState({
                  accessToken,
                });
              }}
            />
          </label>
          <div className="w-full flex flex-col mb-4">
            <textarea className="mt-1 block w-full text-xs bg-gray-200 border-none" disabled spellCheck="false" rows="5" value={log} />
          </div>
          <button className="underline" type="button" onClick={this.generateAccessToken}>
            Generate Access Token
          </button>
        </div>
      </div>
    );
  }
}

export default AccessTokenGeneratorForm;
