/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';

class MPQRCodeGeneratorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generatedQRcodes: [],
      qrcodeParams: {
        accessToken: '',
        size: 1200,
        path: '',
        query: '',
      },
      enableGenerateMultiQRCodes: false,
      requesting: false,
    };
    this.generateQRCodes = this.generateQRCodes.bind(this);
  }

  async generateQRCodes() {
    const generatedQRcodes = [];
    const { qrcodeParams, enableGenerateMultiQRCodes } = this.state;
    const { accessToken, size, path, query } = qrcodeParams;
    const API_URI = `https://api.flyingant.me/api/wechat/genLimitedQRCode`;
    if (enableGenerateMultiQRCodes) {
      // generate a few QRCodes at once
      this.setState({
        requesting: true,
      });
      const generatedQRcodePromises = qrcodeParams.query.split('\n').map(async (q) => {
        const QRCodeURL = `${path}?${q}`;
        const response = await axios.post(API_URI, {
          accessToken,
          size,
          url: `${path}?${q}`,
        });
        if (response.data.errcode) {
          return {
            url: QRCodeURL,
            base64String: '',
            error: JSON.stringify(response.data),
          };
        }
        return {
          url: QRCodeURL,
          base64String: response.data.QRCodeBase64String,
          error: null,
        };
      });
      this.setState({
        generatedQRcodes: await Promise.all(generatedQRcodePromises),
        requesting: false,
      });
    } else {
      this.setState({
        requesting: true,
      });
      const QRCodeURL = `${path}?${query}`;
      axios
        .post(API_URI, {
          accessToken,
          size,
          url: QRCodeURL,
        })
        .then((res) => {
          if (res.data.errcode) {
            generatedQRcodes.push({
              url: QRCodeURL,
              base64String: '',
              error: JSON.stringify(res.data),
            });
          } else {
            generatedQRcodes.push({
              url: QRCodeURL,
              base64String: res.data.QRCodeBase64String,
              error: null,
            });
          }
          this.setState({
            generatedQRcodes,
            requesting: false,
          });
        });
    }
  }

  render() {
    const { generatedQRcodes, qrcodeParams, enableGenerateMultiQRCodes } = this.state;
    return (
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col items-start justify-start p-4">
          <h2 className="text-lg">Generate MP QRCode</h2>
          <ul className="w-full h-full text-xs text-gray-500 flex flex-col items-start justify-center p-4 list-disc">
            <li>
              <b>path</b> 须为已发布的小程序的现有页面。
            </li>
            <li>
              <b>query</b>小程序页面搜携带的参数
            </li>
          </ul>
          <label className="w-full md:w-4/5 flex flex-col mb-4">
            <span className="text-gray-700">access_token</span>
            <textarea
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
              rows="3"
              onChange={(event) => {
                qrcodeParams.accessToken = event.target.value;
                this.setState({
                  qrcodeParams,
                });
              }}
            />
          </label>
          <label className="w-full md:w-4/5 flex flex-col mb-4">
            <span className="text-gray-700">size</span>
            <input
              className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
              type="number"
              placeholder="MAX to 1280px, default to 1200px"
              max={1280}
              onChange={(event) => {
                qrcodeParams.size = event.target.value;
                this.setState({
                  qrcodeParams,
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
                qrcodeParams.path = event.target.value;
                this.setState({
                  qrcodeParams,
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
                qrcodeParams.query = event.target.value;
                this.setState({
                  qrcodeParams,
                  enableGenerateMultiQRCodes: event.target.value.indexOf('\n') !== -1,
                });
              }}
            />
          </label>
          <label className="w-full md:w-4/5 flex flex-row flex-wrap mb-4">
            {generatedQRcodes.map((q) => {
              if (q.error) {
                return (
                  <p key={q.url} className="w-1/4 text-xs">
                    {q.error}
                  </p>
                );
              }
              return <img key={q.url} className="w-1/4" src={q.base64String} alt="QRCode image" />;
            })}
          </label>
          <button className="underline" type="button" onClick={this.generateQRCodes}>
            {enableGenerateMultiQRCodes ? 'Generate Multiple QRCodes' : 'Generate QRCode'}
          </button>
        </div>
      </div>
    );
  }
}

export default MPQRCodeGeneratorForm;
