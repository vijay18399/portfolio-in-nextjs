import sqlite3 from 'sqlite3';
import wordnet from 'wordnet';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'public', 'data', 'words.db');
const db = new sqlite3.Database(dbPath);

// Get groups dynamically using SQL query
function getGroups(callback) {
  db.all(`
        SELECT MIN(word) AS start_word, MAX(word) AS end_word, COUNT(*) AS word_count, grp
        FROM (
        SELECT word, 
                (ROW_NUMBER() OVER (PARTITION BY UPPER(SUBSTR(word, 1, 1)) ORDER BY word) - 1) / 500 AS grp 
        FROM words
        WHERE UPPER(SUBSTR(word, 1, 1)) BETWEEN 'A' AND 'Z'
        )
        GROUP BY grp, UPPER(SUBSTR(word, 1, 1))
        ORDER BY UPPER(SUBSTR(word, 1, 1)), grp;
  `, callback);
}

// Get words between start and end word
function getWordsBetween(startWord, endWord, callback) {
  db.all('SELECT word FROM words WHERE word BETWEEN ? AND ?', [startWord, endWord], callback);
}

// Search word recommendations
function searchRecommendations(query, callback) {
  const likeQuery = `${query}%`;
  db.all('SELECT word FROM words WHERE word LIKE ? LIMIT 10', [likeQuery], callback);
}

// Get word definition from WordNet
async function getWordDefinition(word) {
  await wordnet.init();
  return new Promise((resolve, reject) => {
    wordnet.lookup(word, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

export default async function handler(req, res) {
  try {
    const { group, startWord, endWord, query, word } = req.query;
    
    if (group === 'true') {
        console.log("groups")
      getGroups((err, rows) => {
        console.log("rows",err)
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json(rows);
      });
    } else if (startWord && endWord) {
      getWordsBetween(startWord, endWord, (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json(rows.map(row => row.word));
      });
    } else if (query) {
      searchRecommendations(query, (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json(rows.map(row => row.word));
      });
    } else if (word) {
      const definition = await getWordDefinition(word);
      return res.status(200).json(definition);
    } else {
      res.status(400).json({query : req  , error: 'Invalid request' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ query : req.query , error: 'Failed to process request' });
  }
}
