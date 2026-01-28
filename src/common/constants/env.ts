import jetEnv, { num } from 'jet-env';
import { isNonEmptyString, isValueOf } from 'jet-validators';

export const NodeEnvs = {
  DEV: 'development',
  PRODUCTION: 'production',
} as const;

const EnvVars = jetEnv({
  NodeEnv: isValueOf(NodeEnvs),
  Port: num,
  GeminiApiKey: isNonEmptyString,
});

export default EnvVars;
