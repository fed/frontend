'use strict';

requirejs.config({
  baseUrl: '../js',
  paths: {
    jquery: '../node_modules/jquery/dist/jquery.min',
    mocha: '../node_modules/mocha/mocha',
    chai: '../node_modules/chai/chai'
  }
});

requirejs(['jquery', 'chai', 'game', 'mocha'], function ($, chai, game) {
  mocha.reporter('html');

  // TDD
  mocha.setup('tdd');

  var assert = chai.assert;

  suite('Tetris-TDD', function () {
    suite('the "game" variable', function () {
      test('is defined', function () {
        assert(game);
      });
    });

    suite('the "game.init()" method', function () {
      test('is defined', function () {
        assert(game.init);
      });

      test('is a function', function () {
        assert.isFunction(game.init);
      });
    });

    suite('the "game.Utils.rotateMatrixCW()" method', function () {
      test('is defined', function () {
        assert(game.Utils.rotateMatrixCW);
      });

      test('returns an array when passing "[0, 0, 0]" as argument', function () {
        assert.isArray(game.Utils.rotateMatrixCW([0, 0, 0]));
      });

      test('returns "[[1, 1], [0, 0]]" when passing "[[0, 1], [0, 1]]" as argument', function () {
        assert.deepEqual(game.Utils.rotateMatrixCW([[1, 1], [0, 0]]), [[0, 1], [0, 1]]);
      });
    });
  });

  // BDD
  mocha.setup('bdd');

  var expect = chai.expect;

  describe('Tetris-BDD | expect', function () {
    context('the "game" variable', function () {
      it('is expected to be defined', function () {
        expect(game).to.be.ok;
      });
    });

    context('the "game.init()" method', function () {
      it('is expected to be defined', function () {
        expect(game.init).to.be.ok;
      });

      it('is expected to be a function', function () {
        expect(game.init).to.be.a('function');
      });
    });

    context('the "game.Utils.rotateMatrixCW()" method', function () {
      it('is expected to be defined', function () {
        expect(game.Utils.rotateMatrixCW).to.be.ok;
      });

      it('is expected to return an array when passing "[0, 0, 0]" as argument', function () {
        expect(game.Utils.rotateMatrixCW([0, 0, 0])).to.be.a('array');
      });

      it('is expected to return "[[1, 1], [0, 0]]" when passing "[[0, 1], [0, 1]]" as argument', function () {
        expect(game.Utils.rotateMatrixCW([[1, 1], [0, 0]])).to.deep.equal([[0, 1], [0, 1]]);
      });
    });
  });

  var should = chai.should();

  describe('Tetris-BDD | should', function () {
    context('the "game" variable', function () {
      it('should be defined', function () {
        game.should.be.ok;
      });
    });

    context('the "game.init()" method', function () {
      it('shouldo be defined', function () {
        game.init.should.to.be.ok;
      });

      it('should be a function', function () {
        game.init.should.be.a('function');
      });
    });

    context('the "game.Utils.rotateMatrixCW()" method', function () {
      it('should be defined', function () {
        game.Utils.rotateMatrixCW.should.be.ok;
      });

      it('should return an array when passing "[0, 0, 0]" as argument', function () {
        game.Utils.rotateMatrixCW([0, 0, 0]).should.be.a('array');
      });

      it('should return "[[1, 1], [0, 0]]" when passing "[[0, 1], [0, 1]]" as argument', function () {
        game.Utils.rotateMatrixCW([[1, 1], [0, 0]]).should.deep.equal([[0, 1], [0, 1]]);
      });
    });
  });

  mocha.run();
});
