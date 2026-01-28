import { Router } from 'express';

import Paths from '@src/common/constants/Paths';

import AnalyzeRoutes from './AnalyzeRoutes';
import ScanRoutes from './ScanRoutes';

const apiRouter = Router();

apiRouter.post(Paths.Scan._, ScanRoutes.scan);
apiRouter.post(Paths.Analyze._, AnalyzeRoutes.analyze);

export default apiRouter;
