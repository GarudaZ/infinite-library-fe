import { CanActivateFn } from '@angular/router';
import { UserService } from './services/user.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (next, state) => {
  const userService = inject(UserService);
  const user = userService.getCurrentUser();

  return user !== null;
};
