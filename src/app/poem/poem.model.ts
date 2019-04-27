export class Poem {
  constructor(private _name: string, private _dateAdded = new Date()) {}

  static fromJSON(json: any): Poem {
    const rec = new Poem(json.name, json.created);
    return rec;
  }

  toJSON(): any {
    return {
      name: this.name,
      created: this.dateAdded
    };
  }
  get name(): string {
    return this._name;
  }
  get dateAdded(): Date {
    return this._dateAdded;
  }
}
