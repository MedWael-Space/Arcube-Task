import { customAlphabet } from 'nanoid';
import validUrl from 'valid-url';
import UrlModel from '../models/urlModel.js';
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 8);

const getBaseUrl = () => `${process.env.BASE_URL}`;

export const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!validUrl.isUri(longUrl)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    let url = await UrlModel.findOne({ longUrl });
    
    if (!url) {
      const shortId = nanoid();
      url = new UrlModel({ longUrl, shortId });
      await url.save();
    }
    res.json({ shortUrl: `${getBaseUrl()}/${url.shortId}` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await UrlModel.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    const longUrl = url.longUrl.startsWith('http') ? url.longUrl : `http://${url.longUrl}`;
    res.redirect(longUrl);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


