import express from 'express';
import { shortenUrl, redirectUrl} from '../controllers/urlController.js';

const router = express.Router();
router.post('/api/v1.0.0/shorten', shortenUrl);
router.get('/:shortId', redirectUrl);
export default router;
