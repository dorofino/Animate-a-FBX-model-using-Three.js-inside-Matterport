
import { AnimatorType, makeAnimator } from './sdk-components/Animator';

export const initComponents = async (sdk: any) => {
  await Promise.all([
    sdk.Scene.register(AnimatorType, makeAnimator)
  ]);
} 