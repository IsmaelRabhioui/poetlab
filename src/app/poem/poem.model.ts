import { Theme } from './poem.theme';

export class Poem {
  constructor(
    private _id: number,
    private _title: string,
    private _author: string,
    private _poemText: string,
    private _themes: Theme[],
    private _upVoters: string[],
    private _downVoters: string[],
    private _date: Date,
    private _upvotes: number,
    private _downvotes: number,
    private _image: string
  ) {}

  static fromJSON(json: any): Poem {
    const poem = new Poem(
      json.id,
      json.title,
      json.author,
      json.poemText,
      json.themes,
      json.upVoters,
      json.downVoters,
      json.date,
      json.upvotes,
      json.downvotes,
      json.image
    );
    return poem;
  }

  toJSON(): any {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      poemText: this.poemText,
      themes: this.themes,
      upVoters: this.upVoters,
      downVoters: this.downVoters,
      date: this.date,
      upvotes: this.upvotes,
      downvotes: this.downvotes,
      image: this.image
    };
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get author(): string {
    return this._author;
  }
  get poemText(): string {
    return this._poemText;
  }

  set poemText(value) {
    this._poemText = value;
  }

  get themes(): Theme[] {
    return this._themes;
  }

  set themes(value) {
    this._themes = value;
  }

  get upVoters(): string[] {
    return this._upVoters;
  }

  set upVoters(value) {
    this._upVoters = value;
  }

  get downVoters(): string[] {
    return this._downVoters;
  }

  set downVoters(value) {
    this._downVoters = value;
  }

  get date(): Date {
    return this._date;
  }
  get upvotes(): number {
    return this._upvotes;
  }
  get downvotes(): number {
    return this._downvotes;
  }
  get image(): string {
    return this._image;
  }
  addUpvote() {
    this._upvotes++;
  }
  addDownvote() {
    this._downvotes++;
  }

  removeUpvote() {
    this._upvotes--;
  }
  removeDownvote() {
    this._downvotes--;
  }

  addUpvoter(username: string) {
    this._upVoters.push(username);
  }
  addDownvoter(username: string) {
    this._downVoters.push(username);
  }

  removeUpvoter(username: string) {
    this._upVoters = this._upVoters.filter(f => f != username);
  }
  removeDownvoter(username: string) {
    this._downVoters = this._downVoters.filter(f => f != username);
  }
}
