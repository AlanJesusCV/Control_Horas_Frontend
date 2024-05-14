import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

import * as sodium from 'libsodium-wrappers';

const SECRET_KEY = 'RXJyb3IgZW4gbGEgY29uZXhpb24gZGlu';

@Injectable({
  providedIn: 'root'
})
export class SodiumService {

}
