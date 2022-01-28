import { atom, selector } from 'recoil';
import { position, salary } from 'src/constants/list';

const FILTER = 'Filter';
const FILTER_SELECTOR = 'filter_selector';
export const FILTER_KEY = {
  SALARY: 'salary',
  POSITION: 'position',
} as const;

export const FilterState = {
  [FILTER_KEY.SALARY]: { text: salary[0].text, type: 'HO' },
  [FILTER_KEY.POSITION]: { text: position[0].text },
};

export const filterState = atom<typeof FilterState>({
  key: FILTER,
  default: FilterState,
});

export const filterSelector = selector({
  key: FILTER_SELECTOR,
  get: ({ get }) => {
    const filter = get(filterState);
    return filter;
  },
});
