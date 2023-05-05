import { expect, suite, test } from 'vitest';
import { parseErrorStack, parseStackFrame } from '.';

suite('error-stack-parser', () => {
  test('parseStackFrame', () => {
    expect(parseStackFrame('    at C:\\foo\\bar.js:6:28')).toEqual({
      functionName: null,
      fileName: 'C:/foo/bar.js',
      lineNumber: 6,
      columnNumber: 28,
    });
    expect(parseStackFrame('    at file:///C:/foo/bar.js:131:13')).toEqual({
      functionName: null,
      fileName: 'C:/foo/bar.js',
      lineNumber: 131,
      columnNumber: 13,
    });
    expect(
      parseStackFrame('    at runTest (file:///C:/foo/bar.js:444:15)'),
    ).toEqual({
      functionName: 'runTest',
      fileName: 'C:/foo/bar.js',
      lineNumber: 444,
      columnNumber: 15,
    });
    expect(
      parseStackFrame(
        '    at eval (eval at <anonymous> (C:\\foo\\bar.js:6:17), <anonymous>:1:1)',
      ),
    ).toEqual({
      functionName: '<anonymous>',
      fileName: 'C:/foo/bar.js',
      lineNumber: 6,
      columnNumber: 17,
    });
  });

  test('parseErrorStack', () => {
    expect(
      parseErrorStack(
        'Error:\n' +
          '    at C:\\foo\\bar.js:6:28\n' +
          '    at file:///C:/foo/bar.js:131:13\n' +
          '    at runTest (file:///C:/foo/bar.js:444:15)\n' +
          '    at withEnv (file:///C:/foo/bar.js:195:5)',
      ),
    ).toEqual([
      {
        functionName: null,
        fileName: 'C:/foo/bar.js',
        lineNumber: 6,
        columnNumber: 28,
      },
      {
        functionName: null,
        fileName: 'C:/foo/bar.js',
        lineNumber: 131,
        columnNumber: 13,
      },
      {
        functionName: 'runTest',
        fileName: 'C:/foo/bar.js',
        lineNumber: 444,
        columnNumber: 15,
      },
      {
        functionName: 'withEnv',
        fileName: 'C:/foo/bar.js',
        lineNumber: 195,
        columnNumber: 5,
      },
    ]);
  });
});
