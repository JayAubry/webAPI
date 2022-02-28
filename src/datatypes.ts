type DnDList = {
  results: Array<Spell>;
};

type MonsterList = {
  results: Array<Monster>;
}

// Define the types Spell and Monster to match the two endpoints in https://api.open5e.com/
type Spell = {
    name: string;
    level: string;
    range: string;
};

type Monster = {
    name: string;
    size: string;
    alignment: string
    hit_points: number
};

export { Spell, Monster, DnDList, MonsterList };
