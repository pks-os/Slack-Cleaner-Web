module.exports = {
  ENDPOINT: 'https://slack.com/api/',
  TYPES_DICT: {
    spaces: 'Posts',
    snippets: 'Snippets',
    images: 'Images',
    videos: 'Videos',
    gdocs: 'Google Docs',
    zips: 'Zip Files',
    pdfs: 'PDF Files',
  },
  INIT_TYPES_STATE: {
    spaces: false,
    snippets: false,
    images: false,
    videos: false,
    gdocs: false,
    zips: false,
    pdfs: false,
  },
  FAQ: [
    {
      question: 'How does this work?',
      answer:
        'This app uses the <a href="https://api.slack.com/methods" target="_blank">Slack Web API Methods</a> that are open to all users. You define the type of files you want to search for, this app helps you navigate them, and the API handles the deletion.',
    },
    {
      question: 'Is this made by Slack?',
      answer:
        'Nope, it\'s made by <a href="https://www.linkedin.com/in/miki95" target="_blank">Miroslav Maksimovic</a>, a dreamer who has some groundbreaking ideas and making them live :D',
    },
    {
      question:
        "Bulk delete. How that works?",
      answer:
        "The API method to delete a file requires one argument, the ID of the file to delete which means that the bulk deletion made multiple calls to the API at the same time. Slack has introduced <a href='https://api.slack.com/docs/rate-limits#tiers'>rate limits</a> on the number of times a method can be called per minute. While yes, it allows burts, if there was an error related to the rate limit, it's hard to communicate why to users. Rather than having errors be caused by people with loads of files, introducing a queuing system, or straight up taking the app down, I added in some features some people had been looking for.",
    },
    {
      question: 'Is this app safe?',
      answer:
        'We store nothing. The only information needed to log you in is stored is stored as a unique session. There are no databases, no caching (except on your own machine), anything.',
    },
    {
      question: 'I have a feature / idea / request / job offer / how is this built?',
      answer:
        'This entire product is open source. Feel free to poke around the repo and add some PR\'s <a href="https://github.com/ngQuad/Slack-Cleaner-Web" target="_blank">here</a>',
    },
  ],
};
