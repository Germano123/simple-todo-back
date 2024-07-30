import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';

const providers = [ApiConfigService]

@Global()
@Module({
    providers,
    imports: [
        // JwtModule.forRootAsync({}),
        HttpModule,
    ],
    exports: [ ...providers, HttpModule, /*JwtModule*/ ]
})
export class SharedModule {}