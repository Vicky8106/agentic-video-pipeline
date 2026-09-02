import { SceneModule } from "./SceneTypes";
import { Scene01_Ecosystem } from "./Scene01_Ecosystem";
import { Scene02_TechBro } from "./Scene02_TechBro";
import { Scene03_Celebrities } from "./Scene03_Celebrities";
import { Scene04_Unsubscribe } from "./Scene04_Unsubscribe";
import { Scene05_TimBurtonPS1 } from "./Scene05_TimBurtonPS1";
import { Scene06_Pendulum } from "./Scene06_Pendulum";
import { Scene07_HeroinChic } from "./Scene07_HeroinChic";
import { Scene08_PixarMom } from "./Scene08_PixarMom";
import { Scene09_HourglassPR } from "./Scene09_HourglassPR";
import { Scene10_BossClosesTab } from "./Scene10_BossClosesTab";
import { Scene11_Y2KFashion } from "./Scene11_Y2KFashion";
import { Scene12_GLP1CheatCode } from "./Scene12_GLP1CheatCode";
import { Scene13_HollywoodDenial } from "./Scene13_HollywoodDenial";
import { Scene14_MCUSuperhero } from "./Scene14_MCUSuperhero";
import { Scene15_BuccalFat } from "./Scene15_BuccalFat";
import { Scene16_TikTokTribunal } from "./Scene16_TikTokTribunal";
import { Scene17_CyborgMonoculture } from "./Scene17_CyborgMonoculture";
import { Scene18_EconomicOutro } from "./Scene18_EconomicOutro";

export const ALL_SCENES: SceneModule[] = [
  Scene01_Ecosystem,
  Scene02_TechBro,
  Scene03_Celebrities,
  Scene04_Unsubscribe,
  Scene05_TimBurtonPS1,
  Scene06_Pendulum,
  Scene07_HeroinChic,
  Scene08_PixarMom,
  Scene09_HourglassPR,
  Scene10_BossClosesTab,
  Scene11_Y2KFashion,
  Scene12_GLP1CheatCode,
  Scene13_HollywoodDenial,
  Scene14_MCUSuperhero,
  Scene15_BuccalFat,
  Scene16_TikTokTribunal,
  Scene17_CyborgMonoculture,
  Scene18_EconomicOutro,
];

export function getActiveScene(timeSec: number): SceneModule {
  for (const scene of ALL_SCENES) {
    if (timeSec >= scene.startTime && timeSec < scene.endTime) {
      return scene;
    }
  }
  // Default to last scene if past duration, or first if before
  if (timeSec >= ALL_SCENES[ALL_SCENES.length - 1].endTime) {
    return ALL_SCENES[ALL_SCENES.length - 1];
  }
  return ALL_SCENES[0];
}
