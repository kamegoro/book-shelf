import sgMail, { MailService } from '@sendgrid/mail';

export type SendGridMsg = {
  to: string;
  from: string;
  subject: string;
  text: string;
};

const sendMail: MailService['send'] = async (msg: SendGridMsg) => {
  const sendGridKey = process.env.SENDGRID_API_KEY;
  if (!sendGridKey) {
    throw new Error('sendgrid api key must be present.');
  }
  sgMail.setApiKey(sendGridKey);

  return sgMail
    .send(msg)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export default sendMail;
