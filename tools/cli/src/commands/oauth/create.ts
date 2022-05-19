import {Command, Flags, CliUx} from '@oclif/core'
import {v4 as uuid} from 'uuid';

import {
  databaseInitialize,
  AuthClient,
  AuthClientProvider
} from 'data';

export default class OAuth extends Command {
  static description = 'Create oauth client.'

  static examples = [
    'atlas oauth:create --client=your_client_name',
  ]

  static flags = {
    client: Flags.string({required: true}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(OAuth);
    const {client} = flags;
    
    CliUx.ux.action.start(`Creating OAuth client: ${client}...`);
    
    await databaseInitialize();
    
    try {
      const result:AuthClient = await AuthClientProvider.save({
        name: client,
        secret: uuid(),
        trusted: true,
      });
  
      CliUx.ux.action.stop();
      console.log(`Created OAuth client: ${result.name} / ${result.secret}`);
    } catch (err) {
      CliUx.ux.action.stop();
      this.error((<Error>err).message);
    }

    process.exitCode = 1;
    process.exit();
  }
}
