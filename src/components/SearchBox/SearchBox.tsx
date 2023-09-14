import React, { useRef, useState } from 'react';
import '../../sass/main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useOnClickOutside } from '../../utils/hooks/useClickOutside'
/*eslint-disable*/

interface ISearchBox {
  className?: string
  fixedList?: any
  selected?: any
  setList?: any
  sortList?: any
  onOptionClick?: any
  handleSearchSelect?: any
}

export const SearchBox = ({ className, fixedList, setList, selected, sortList, onOptionClick }: ISearchBox) => {
  const [results, setResults] = useState<any>()
  const [focused, setFocused] = useState(false)
  const ref = useRef()

  useOnClickOutside(ref, () => {
    setFocused(false)
  })


  const handleQuery = (value: string) => {
    const calculateSimilarity = (str1, str2) => {
      const len1 = str1.length;
      const len2 = str2.length;
      const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

      for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
          if (i === 0) dp[i][j] = j;
          else if (j === 0) dp[i][j] = i;
          else if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
          else
            dp[i][j] =
              1 +
              Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }

      return dp[len1][len2];
    };

    const inputLowerCase = value.toLowerCase();
    const sortedData = !sortList ? fixedList.filter(f => !selected.some(s => s.value !== f.value)) : fixedList

    sortedData.sort((a, b) => {
      const similarityA = calculateSimilarity(inputLowerCase, a.label.toLowerCase());
      const similarityB = calculateSimilarity(inputLowerCase, b.label.toLowerCase());
      return similarityA - similarityB;
    });

    setResults(sortedData.slice(0, 5))
    sortList && sortList(sortedData)
  }

  const setSelected = (r) => {
    setList(prev => {
      const copy = structuredClone(prev)
      return [...copy, r]
    })
    setFocused(false)
    // setList(prev => [...prev, r])
  }

  const handleOptionClick = (o) => {
    setSelected(o)
    onOptionClick && onOptionClick(o)
  }


  return (
    <div ref={ref} className={'search-box-container ' + className} tabIndex={1}>
      <input type='text' placeholder='Vodoinstalater, kuhinja, veš mašine...' onChange={(e) => handleQuery(e.target.value)} onFocus={() => setFocused(true)} />
      <FontAwesomeIcon icon={faSearch} />
      {!sortList && focused && <div className='search-results'>
        {results?.length > 0 ? results.map((r, i) => <div key={i} className='single-search-result' onClick={() => handleOptionClick(r)} ><p>{r.label}</p></div>) :
          fixedList.filter(f => !selected.some(s => s.value == f.value)).slice(0, 5).map((r, i) => <div key={i} className='single-search-result' onClick={() => handleOptionClick(r)} ><p>{r.label}</p></div>)}
      </div>}
    </div>
  );
};
