import jetPaths from 'jet-paths';

const Paths = {
  _: '/',

  Scan: {
    _: '/scan',
  },

  Analyze: {
    _: '/analyze',
  },
} as const;

export const JetPaths = jetPaths(Paths);
export default Paths;
