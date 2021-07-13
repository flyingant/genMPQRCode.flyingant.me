/* eslint-disable react/no-unused-state */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';

class URLSchemeGeneratorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlSchemeParams: {
        accessToken: '',
        path: '',
        query: '',
      },
      log: '',
      enableGenerateMultiURLScheme: false,
      requesting: false,
    };
    this.generateURLScheme = this.generateURLScheme.bind(this);
  }

  async generateURLScheme() {
    let { log } = this.state;
    const { urlSchemeParams, enableGenerateMultiURLScheme } = this.state;
    if (enableGenerateMultiURLScheme) {
      // generate a few URL scheeme at once
      urlSchemeParams.query.split('\n').forEach(async (query) => {
        this.setState({
          requesting: true,
        });
        axios
          .post(`https://api.flyingant.me/api/wechat/genURLScheme`, {
            accessToken: urlSchemeParams.accessToken,
            path: urlSchemeParams.path,
            query,
          })
          .then((res) => {
            log = log.concat(`Query: ${query}\n${JSON.stringify(res.data)}\n-----\n`);
            this.setState({
              log,
              requesting: false,
            });
          });
      });
    } else {
      const result = await axios.post(`https://api.flyingant.me/api/wechat/genURLScheme`, {
        accessToken: urlSchemeParams.accessToken,
        path: urlSchemeParams.path,
        query: urlSchemeParams.query,
      });
      log = log.concat(`Query: ${urlSchemeParams.query}\n${JSON.stringify(result.data)}\n-----\n`);
      this.setState({
        log,
      });
    }
  }

  render() {
    const { log, urlSchemeParams, enableGenerateMultiURLScheme } = this.state;
    return (
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col items-start justify-start p-4">
          <h2 className="text-lg">Generate URL Scheme</h2>
          <ul className="w-full h-full text-xs text-gray-500 flex flex-col items-start justify-center p-4 list-disc">
            <li>
              <b>path</b> 须为已发布的小程序的现有页面，不可携带query，路径为空时会跳转主页
            </li>
            <li>
              <b>query</b> 只支持数字，大小写英文以及部分特殊字符：!#$&&apos;()*+,/:;=?@-._~
            </li>
          </ul>
          <label className="w-full md:w-4/5 flex flex-col mb-4">
            <span className="text-gray-700">access_token</span>
            <input
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
              type="text"
              onChange={(event) => {
                urlSchemeParams.accessToken = event.target.value;
                this.setState({
                  urlSchemeParams,
                });
              }}
            />
          </label>
          <label className="w-full md:w-4/5 flex flex-col mb-4">
            <span className="text-gray-700">path</span>
            <input
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
              type="text"
              placeholder="e.g. pages/index/index"
              onChange={(event) => {
                urlSchemeParams.path = event.target.value;
                this.setState({
                  urlSchemeParams,
                });
              }}
            />
          </label>
          <label className="w-full md:w-4/5 flex flex-col mb-4">
            <span className="text-gray-700">query</span>
            <textarea
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
              type="text"
              placeholder="e.g. a=1&b=2&c=3"
              spellCheck="false"
              rows="5"
              onChange={(event) => {
                urlSchemeParams.query = event.target.value;
                this.setState({
                  urlSchemeParams,
                  enableGenerateMultiURLScheme: event.target.value.indexOf('\n') !== -1,
                });
              }}
            />
          </label>
          <div className="w-full flex flex-col mb-4">
            <textarea className="mt-1 block w-full text-xs bg-gray-200 border-none" disabled spellCheck="false" rows="5" value={log} />
          </div>
          <button className="underline" type="button" onClick={this.generateURLScheme}>
            {enableGenerateMultiURLScheme ? 'Generate Multiple URL Schemes' : 'Generate URL Scheme'}
          </button>
        </div>
      </div>
    );
  }
}

export default URLSchemeGeneratorForm;
