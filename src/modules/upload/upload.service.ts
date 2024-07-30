import { Injectable } from '@nestjs/common';
import { IFile } from '../../interfaces/IFile';

@Injectable()
export abstract class UploadService {
  abstract uploadFile(file: IFile): Promise<string>;
}
