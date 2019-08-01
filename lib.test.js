const readlineSync = require('readline-sync');

const {
  stringify,
  createBlankWordArray,
  isWordSolved,
  print,
  randomlySelectWord,
  askForALetter,
  validateInput
} = require('./lib');

describe('stringify', () => {
  // fit focuses on a test
  // xit skips a test
  it('should convert to arbitrary string array to a string', () => {
    const stringArray = ['h', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);

    expect(result).toBe('hello');
  });

  it('should maintain case', () => {
    const stringArray = ['H', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);
    expect(result).toBe('Hello');

    const allCapsArray = ['H', 'E', 'L', 'L', 'O'];
    expect(stringify(allCapsArray)).toBe('HELLO');
  });

  it('should maintain white-space', () => {
    const stringArray = 'Hello world'.split();
    const result = stringify(stringArray);
    expect(result).toBe('Hello world');
  });

  it('should return empty string', () => {
    expect(stringify([])).toBe('');
  });
});

describe('createdBlankWordArray', () => {
  it('should return an array of arbitrary length full of underscores', () => {
    const result = createBlankWordArray(10);
    // test the length
    expect(result.length).toBe(10);
    expect(result).toHaveLength(10);
    // if they are actually all underscores
    expect(result.every(letter => letter === '_')).toBeTruthy();
  });

  it('should return an empty array when passed a length of 0', () => {
    expect(createBlankWordArray(0)).toHaveLength(0);
  });

  it('should gracefully handle undefined input', () => {
    const result = createBlankWordArray();
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it('should gracefully handle string input', () => {
    expect(createBlankWordArray('hello')).toHaveLength(0);
    expect(createBlankWordArray({})).toHaveLength(0);
    expect(createBlankWordArray(true)).toHaveLength(0);
  });
});

describe('isWordSolved', () => {
  it('should return false if there is at least one underscore', () => {
    const input = 'a_b'.split('');
    const result = isWordSolved(input);
    expect(result).toBe(false);
    expect(result).toBeFalsy();
    expect(result).not.toBeTruthy();
  });

  it('should return if there are no underscores', () => {
    const input = 'abc'.split('');
    const result = isWordSolved(input);
    expect(result).toBeTruthy();
  });

  it('should throw a TypeError if passed undefined input', () => {
    // expect.assertions(1);
    // try {
    //   isWordSolved();
    // } catch (err) {
    //   expect(err).toBeInstanceOf(TypeError);
    // }
    // expect(() => isWordSolved()).toThrow(TypeError);
  });
});

describe('print', () => {
  it('should log output to the console', () => {
    console.log = jest.fn(); // mock the console.log function

    print('Some input');

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('Some input');

    console.log.mockClear(); // clear the mock state
  });

  it('should output an empty string to the console', () => {
    print('');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('');
  });
});

xdescribe('randomlySelectWord', () => {
  it('should return the middle word', () => {
    Math.random = jest.fn();
    Math.random
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9);

    const firstResult = randomlySelectWord(['first', 'second', 'third']);
    const secondResult = randomlySelectWord(['first', 'second', 'third']);
    const thirdResult = randomlySelectWord(['first', 'second', 'third']);

    expect(firstResult).toBe('first');
    expect(secondResult).toBe('second');
    expect(thirdResult).toBe('third');
  });
});

jest.mock('readline-sync');
describe('askForALetter', () => {
  it('should return the letter that the user input', () => {
    readlineSync.question.mockReturnValueOnce('a');
    const result = askForALetter();
    expect(result).toBe('a');
  });
});

describe('validateInput', () => {
  xit('should only return a single letter when a single letter is passed', () => {
    const result = validateInput('a');
    expect(result).toBe('a');
  });

  xit('should return the first character if it receives a string', () => {
    const result = validateInput('string');
    expect(result).toBe('s');
  });

  xit('should throw an error with a message of "Invalid input" if it recieves a number', () => {
    expect.assertions(2);
    try {
      validateInput(2);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Invalid input');
    }
  });

  xit('should throw an error if it recieves an undefined inputshould throw an error with a message of undefined input', () => {
    expect(validateInput).toThrow('Invalid input');
  });

  it.todo('should throw an aerror if it recieves a object');

  it(`should throw an error with a message of "invalid input", if it recieves a character that isn't a letter`, () => {
    expect(() => {
      validateInput('2');
    }).toThrow('Invalid input');

    expect(() => {
      validateInput('.');
    }).toThrow('Invalid input');
  });
});
