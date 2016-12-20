import Base from './Base.js';

class TestBase extends Base {
  constructor(...args) {
    super(...args);
    this.counter = {
      updateDimension: 0
    };
  }

  _updateDimension() {
    this.counter.updateDimension++;
  }
}

describe.only('Base', ()=>{
  let base;

  it('should exist', ()=>{
    expect(Base).to.exist;
  });

  beforeEach(() => {
    base = new TestBase({
      initialWidth: 10,
      initialHeight: 10,
      margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      offset: [1, 1],
      pixelRatio: 10,
    });
  });

  describe('(static) Base.getDefaultOptions()', ()=>{
    it('should return an options object', ()=>{

    });
  });

  describe('new Base(options)', ()=>{
    it('should construct an object with the given options', ()=>{

    });
  });

  describe('.copyDimension(another)', ()=>{
    it('should', ()=>{

    });
  });

  describe('.dimension([dimension])', ()=>{
    describe('as getter: when called without argument', ()=>{
      it('should return current value', ()=>{
        expect(base.dimension()).to.deep.equal([10, 10]);
      });
    });
    describe('as setter: when called with argument', ()=>{
      it('should set value and update dimension if the new value is different from current value', (done)=>{
        base.dimension([20, 20]);
        expect(base.dimension()).to.deep.equal([20, 20]);
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(1);
          done();
        }, 10);
      });
      it('should not update dimension if the new value is equal to current value', (done)=>{
        base.dimension([10, 10]);
        expect(base.dimension()).to.deep.equal([10, 10]);
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(0);
          done();
        }, 10);
      });
    });
  });

  describe('.margin([margin])', ()=>{
    describe('as getter: when called without argument', ()=>{
      it('should return current value', ()=>{
        expect(base.margin()).to.deep.equal({left: 10, right: 10, top: 10, bottom: 10});
      });
    });
    describe('as setter: when called with argument', ()=>{
      it('should set value and update dimension if the new value is different from current value', (done)=>{
        base.margin({left: 1, right: 1, top: 1, bottom: 1});
        expect(base.margin()).to.deep.equal({left: 1, right: 1, top: 1, bottom: 1});
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(1);
          done();
        }, 10);
      });
      it('should not update dimension if the new value is equal to current value', (done)=>{
        base.margin({left: 10, right: 10, top: 10, bottom: 10});
        expect(base.margin()).to.deep.equal({left: 10, right: 10, top: 10, bottom: 10});
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(0);
          done();
        }, 10);
      });
    });
  });

  describe('.offset([offset])', ()=>{
    describe('as getter: when called without argument', ()=>{
      it('should return current value', ()=>{
        expect(base.offset()).to.deep.equal([1, 1]);
      });
    });
    describe('as setter: when called with argument', ()=>{
      it('should set value and update dimension if the new value is different from current value', (done)=>{
        base.offset([2, 2]);
        expect(base.offset()).to.deep.equal([2, 2]);
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(1);
          done();
        }, 10);
      });
      it('should not update dimension if the new value is equal to current value', (done)=>{
        base.offset([1, 1]);
        expect(base.offset()).to.deep.equal([1, 1]);
        window.setTimeout(() => {
          expect(base.counter.updateDimension).to.equal(0);
          done();
        }, 10);
      });
    });
  });

  ['width', 'height', 'pixelRatio'].forEach(field => {
    describe(`.${field}([${field}]])`, ()=>{
      describe('as getter: when called without argument', ()=>{
        it('should return current value', ()=>{
          expect(base[field]()).to.equal(10);
        });
      });
      describe('as setter: when called with argument', ()=>{
        it('should set value and update dimension if the new value is different from current value', (done)=>{
          base[field](1);
          expect(base[field]()).to.equal(1);
          window.setTimeout(() => {
            expect(base.counter.updateDimension).to.equal(1);
            done();
          }, 10);
        });
        it('should not update dimension if the new value is equal to current value', (done)=>{
          base[field](10);
          expect(base[field]()).to.equal(10);
          window.setTimeout(() => {
            expect(base.counter.updateDimension).to.equal(0);
            done();
          }, 10);
        });
      });
    });
  });

  describe('.updateDimensionNow()', ()=>{
    it('should trigger update dimension immediately', ()=>{
      expect(base.counter.updateDimension).to.equal(0);
      base.updateDimensionNow();
      expect(base.counter.updateDimension).to.equal(1);
    });
  });
});