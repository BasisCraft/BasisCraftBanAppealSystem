import React, { useState, useCallback } from 'react';

const BasisCraftBanAppealSystem = () => {
  const [language, setLanguage] = useState('en');
  const [activeSystem, setActiveSystem] = useState('smp');
  const [formData, setFormData] = useState({
    mcName: '',
    email: '',
    banId: '',
    appealReason: '',
    appealCategory: '',
    additionalInfo: '',
  });
  const [reportNumber, setReportNumber] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [checkStatus, setCheckStatus] = useState('');
  const [progressValue, setProgressValue] = useState(0);
  const [statusDetails, setStatusDetails] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const translations = {
    en: {
      title: 'BasisCraft Ban Appeal System',
      smp: 'BasisSMP',
      minigame: 'BasisMinigame',
      mcName: 'Minecraft Username',
      email: 'Email Address',
      banId: 'Ban ID',
      appealCategory: 'Appeal Category',
      appealReason: 'Reason for Appeal',
      additionalInfo: 'Additional Information',
      submit: 'Submit Appeal',
      checkStatus: 'Check Appeal Status',
      enterReportNumber: 'Enter Report Number',
      check: 'Check Status',
      status: 'Status',
      unfairBan: 'Unfair Ban',
      hackedAccount: 'Hacked Account',
      other: 'Other',
      selectCategory: 'Select Category',
      backToWebsite: 'Back to Official Website',
      appealSubmitted: 'Appeal Submitted Successfully!',
      reportNumberIs: 'Your report number is:',
      processingTime: 'We will process your appeal within 48 hours.',
      close: 'Close',
      inquire: '?',
      mcNameExample: 'Enter your exact Minecraft username, e.g. Steve123',
      emailExample: 'Enter a valid email address where we can contact you',
      banIdExample: 'Enter the Ban ID you received when you were banned',
      appealReasonExample: 'Explain in detail why you believe your ban should be lifted',
      additionalInfoExample: 'Provide any additional information that might support your appeal',
    },
    zh: {
        title: 'BasisCraft 封禁申诉系统',
        smp: 'BasisSMP',
        minigame: 'BasisMinigame',
        mcName: '我的世界用户名',
        email: '电子邮件地址',
        banId: '封禁ID',
        appealCategory: '申诉类别',
        appealReason: '申诉理由',
        additionalInfo: '附加信息',
        submit: '提交申诉',
        checkStatus: '检查申诉状态',
        enterReportNumber: '输入报告编号',
        check: '检查状态',
        status: '状态',
        unfairBan: '不公平封禁',
        hackedAccount: '账号被盗',
        other: '其他',
        selectCategory: '选择类别',
        backToWebsite: '返回官方网站',
        appealSubmitted: '申诉提交成功！',
        reportNumberIs: '您的报告编号是：',
        processingTime: '我们将在48小时内处理您的申诉。',
        close: '关闭',
        inquire: '?',
        mcNameExample: '输入您的确切我的世界用户名，例如 Steve123',
        emailExample: '输入一个有效的电子邮件地址，我们可以通过它联系您',
        banIdExample: '输入您被封禁时收到的封禁ID',
        appealReasonExample: '详细解释为什么您认为应该解除封禁',
        additionalInfoExample: '提供任何可能支持您申诉的额外信息',
    },
  };

  const t = (key) => translations[language][key];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReportNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
    setReportNumber(newReportNumber);
    setSubmissionStatus('submitted');
    setNotificationMessage(`${t('appealSubmitted')} ${t('reportNumberIs')} ${newReportNumber}`);
    setShowNotification(true);
  };

  const handleCheck = useCallback(() => {
    setProgressValue(0);
    const statuses = ['Submitted', 'Under Review', 'Processed'];
    let currentIndex = 0;

    const updateProgress = () => {
      if (currentIndex < statuses.length) {
        setCheckStatus(statuses[currentIndex]);
        setProgressValue((currentIndex + 1) * (100 / statuses.length));
        setStatusDetails(`An admin reviewed your appeal on ${new Date().toLocaleString()}`);
        currentIndex++;
        setTimeout(updateProgress, 1000);
      }
    };

    updateProgress();
  }, []);

  const renderInquiryButton = (field) => (
    <button
      type="button"
      className="ml-2 text-sm bg-blue-500 text-white rounded-full w-5 h-5 focus:outline-none"
      onClick={() => {
        setNotificationMessage(t(`${field}Example`));
        setShowNotification(true);
      }}
    >
      {t('inquire')}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-blue-950 bg-opacity-30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">{t('title')}</h1>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-700 text-white rounded-md px-2 py-1 w-full md:w-auto"
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveSystem('smp')}
                className={`px-4 py-2 rounded-md text-white w-full md:w-auto transition-all duration-300 ${activeSystem === 'smp' ? 'bg-orange-500' : 'bg-gray-700 hover:bg-orange-500'}`}
              >
                {t('smp')}
              </button>
              <button
                onClick={() => setActiveSystem('minigame')}
                className={`px-4 py-2 rounded-md text-white w-full md:w-auto transition-all duration-300 ${activeSystem === 'minigame' ? 'bg-green-500' : 'bg-gray-700 hover:bg-green-500'}`}
              >
                {t('minigame')}
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-blue-200">{t(activeSystem)}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="mcName" className="block text-white text-sm font-medium mb-1">
                  {t('mcName')}
                  {renderInquiryButton('mcName')}
                </label>
                <input
                  type="text"
                  id="mcName"
                  name="mcName"
                  value={formData.mcName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
                  {t('email')}
                  {renderInquiryButton('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="banId" className="block text-white text-sm font-medium mb-1">
                  {t('banId')}
                  {renderInquiryButton('banId')}
                </label>
                <input
                  type="text"
                  id="banId"
                  name="banId"
                  value={formData.banId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="appealCategory" className="block text-white text-sm font-medium mb-1">
                  {t('appealCategory')}
                </label>
                <select
                  id="appealCategory"
                  name="appealCategory"
                  value={formData.appealCategory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">{t('selectCategory')}</option>
                  <option value="unfairBan">{t('unfairBan')}</option>
                  <option value="hackedAccount">{t('hackedAccount')}</option>
                  <option value="other">{t('other')}</option>
                </select>
              </div>
              <div>
                <label htmlFor="appealReason" className="block text-white text-sm font-medium mb-1">
                  {t('appealReason')}
                  {renderInquiryButton('appealReason')}
                </label>
                <textarea
                  id="appealReason"
                  name="appealReason"
                  value={formData.appealReason}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="additionalInfo" className="block text-white text-sm font-medium mb-1">
                  {t('additionalInfo')}
                  {renderInquiryButton('additionalInfo')}
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                {t('submit')}
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-blue-200">{t('checkStatus')}</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t('enterReportNumber')}
                value={reportNumber}
                onChange={(e) => setReportNumber(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCheck}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                {t('check')}
              </button>
              {checkStatus && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressValue}%` }}></div>
                  </div>
                  <p className="text-center mt-2 text-white">{checkStatus}</p>
                  <p className="text-center mt-2 text-white text-sm">{statusDetails}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {submissionStatus === 'submitted' && (
          <div className="mt-8 p-4 bg-green-500 bg-opacity-20 rounded-md">
            <h3 className="text-lg font-semibold text-white">{t('appealSubmitted')}</h3>
            <p className="text-white">{t('reportNumberIs')} <strong>{reportNumber}</strong></p>
            <p className="text-white">{t('processingTime')}</p>
          </div>
        )}

        {showNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Notification</h3>
                <button 
                  onClick={() => setShowNotification(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <p className="text-gray-700">{notificationMessage}</p>
            </div>
          </div>
        )}

        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Copyright © 2023-2024 BIHZ Sean Ma & BIBWH Gary. All Rights Reserved. | Version: 0.0.1 | Privacy Policy
          </p>
          <a href="#" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">
            {t('backToWebsite')}
          </a>
        </footer>
      </div>
    </div>
  );
};

export default BasisCraftBanAppealSystem;