import Dexie from 'dexie'
// import 'dexie-observable'
// import { IDatabaseChange } from 'dexie-observable/api'

export namespace Entities {
  export interface Contract {
    id?: number
    name?: string
    address: string
    createdTime?: number
    abi: object | []
  }

  export interface Filter extends Contract {
    contractName?: string
  }

  export interface ShortCuts extends Contract {
    contractName?: string,
    type: 'read' | 'write'
  }
}

class Database extends Dexie {
  public readonly contracts!: Dexie.Table<Entities.Contract, string>
  public readonly filters!: Dexie.Table<Entities.Filter, string>
  public readonly shortCuts!: Dexie.Table<Entities.ShortCuts, string>

  constructor() {
    super('inspect')

    this.version(1).stores({
      contracts: '++id, &address, name',
      filters: '++id, address, name, contractName',
      shortCuts: '++id, address, name, contractName'
    })
    this.open().catch((err) => console.error(err))
  }

  // public subscribe(
  //   tableName: string,
  //   onChange: (changes: IDatabaseChange[]) => void
  // ) {
  //   const ev = this.on('changes')
  //   const fn = (changes: IDatabaseChange[]) => {
  //     changes = changes.filter(c => c.table === tableName)
  //     if (changes.length > 0) {
  //       onChange(changes)
  //     }
  //   }
  //   ev.subscribe(fn)
  //   return {
  //     unsubscribe: () => ev.unsubscribe(fn)
  //   }
  // }
}

const DB = new Database()

// DB.filters.hook('creating', function() {
//   BUS.$emit('added-filter')

// })

export default DB
