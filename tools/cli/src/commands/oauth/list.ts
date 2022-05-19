import {Command, Flags, CliUx} from '@oclif/core'
import {v4 as uuid} from 'uuid';

import {
  databaseInitialize,
  AuthClient,
  AuthClientProvider
} from 'data';

export default class OAuth extends Command {
  static description = 'List all oauth clients.'

  static examples = [
    'atlas oauth:list --clients',
  ]

  static flags = {
    clients: Flags.boolean({required: true}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(OAuth);
    const {clients} = flags;
    
    CliUx.ux.action.start(`Fetching oauth clients...`);
    
    await databaseInitialize();
    
    try {
      const result:AuthClient[] = await AuthClientProvider.list();
  
      CliUx.ux.action.stop();
      console.log("\n");

      const rows:Record<string, any>[] = result.map(client => Object.assign({}, client));

      CliUx.ux.table(rows, {
        name: {},
        id: {},
        secret: {}
      });

      console.log("\n");
      
    } catch (err) {
      CliUx.ux.action.stop();
      this.error((<Error>err).message);
    }

    process.exitCode = 1;
    process.exit();
  }
}
