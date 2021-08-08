import { AppearanceService } from '../../../services/appearance.service';

export default class Auth {
  isDark = false;

  constructor(appearanceService: AppearanceService) {
    this.isDark = appearanceService.isDarkModeEnabled;
  }
}
