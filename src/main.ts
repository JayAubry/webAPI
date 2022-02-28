import axios, { AxiosResponse } from "axios";
import { DnDList, MonsterList, Spell, Monster } from "./datatypes";

const Spell_limitInput: Element | null = document.getElementById("input1");
const MonsterlimitInput: Element | null = document.getElementById("input2");

const fetchBtn1 = document.getElementById("btn1");
const fetchBtn2 = document.getElementById("btn2");

const spellTable = document.getElementById("spells");
const monsterTable = document.getElementById("monsters");


// Define a click listener on the button
fetchBtn1?.addEventListener("click", () => {
  removeOldSpellData();
  fetchNewSpellData();
});

// Define a click listener on the button
fetchBtn2?.addEventListener("click", () => {
  removeOldMonsterData();
  fetchNewMonsterData();
});

function removeOldSpellData() {
  // Use the class name fromAPI to select all the rows
  // in the table which are generated axios data
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromAPI");

  for (let k = 0; k < rows.length; k++) {
    // Remove the row from the parent (myTable)
    spellTable?.removeChild(rows[k]);
  }
}

function removeOldMonsterData() {
  // Use the class name fromAPI to select all the rows
  // in the table which are generated axios data
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromAPI");

  for (let k = 0; k < rows.length; k++) {
    // Remove the row from the parent (myTable)
    monsterTable?.removeChild(rows[k]);
  }
}

function fetchNewSpellData() {
  // Use the user input to control the number of random users to fetch
  const fetchSpellLimit = (Spell_limitInput as HTMLInputElement)?.value ?? 10;
  const yo = document.getElementById("input1");
  axios
    .request({
      method: "GET",
      url: "https://api.open5e.com/spells/",
      params: { results: fetchSpellLimit },
    })
    .then((r: AxiosResponse) => r.data)
    .then((ru: DnDList) => {
      for (let k = 0; k < ru.results.length; k++) {
        const spell: Spell = ru.results[k];
        const aRow = document.createElement("tr");
        // Use a unique class name so it is easy to remove rows later
        aRow.setAttribute("class", "fromAPI");
        spellTable?.appendChild(aRow);

        // Create a table data cell to show name of spell
        const nameCell = document.createElement("td");
        nameCell.innerText = `${spell.name}`;
        aRow.appendChild(nameCell);

        // Create a table data cell to show required level of spell
        const levelCell = document.createElement("td");
        levelCell.innerText = `${spell.level}`;
        aRow.appendChild(levelCell);

        // Create a table data cell to show description of spell
        const descriptionCell = document.createElement("td");
        descriptionCell.innerText = `${spell.range}`;
        aRow.appendChild(descriptionCell);
      }
    });
}


function fetchNewMonsterData() {
  // Use the user input to control the number of random users to fetch
  const fetchMonsterLimit = (MonsterlimitInput as HTMLInputElement)?.value ?? 10;
  axios
    .request({
      method: "GET",
      url: "https://api.open5e.com/monsters/",
      params: { results: fetchMonsterLimit },
    })
    .then((r: AxiosResponse) => r.data)
    .then((ru: MonsterList) => {
      for (let k = 0; k < ru.results.length; k++) {
        const monster: Monster = ru.results[k];
        const bRow = document.createElement("tr");
        // Use a unique class name so it is easy to remove rows later
        bRow.setAttribute("class", ".fromAPI");
        monsterTable?.appendChild(bRow);

        // Create a table data cell to show name of monster
        const monsterNameCell = document.createElement("td");
        monsterNameCell.innerText = `${monster.name}`;
        bRow.appendChild(monsterNameCell);

        // Create a table data cell to show rsize of monster
        const sizeCell = document.createElement("td");
        sizeCell.innerText = `${monster.size}`;
        bRow.appendChild(sizeCell);

        // Create a table data cell to show alignment of monster
        const alignmentCell = document.createElement("td");
        alignmentCell.innerText = `${monster.alignment}`;
        bRow.appendChild(alignmentCell);

        // Create a table data cell to show monster hit points
        const hitpointsCell = document.createElement("td");
        hitpointsCell.innerText = `${monster.hit_points}`;
        bRow.appendChild(hitpointsCell);
      }
    });


  
}

fetchNewSpellData();
fetchNewMonsterData();