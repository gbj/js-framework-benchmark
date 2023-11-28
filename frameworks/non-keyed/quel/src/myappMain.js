import { buildData } from "./buildData.js";

const html = `
<div class="container">
  <div class="jumbotron">
    <div class="row">
      <div class="col-md-6">
        <h1>quel-"non-keyed"</h1>
      </div>
      <div class="col-md-6">
        <div class="row">
        <div class="col-sm-6 smallpad">
          <button class="btn btn-primary btn-block" id="run" data-bind="run">Create 1,000 rows</button>
        </div>
        <div class="col-sm-6 smallpad">
          <button class="btn btn-primary btn-block" id="runlots" data-bind="runLots">Create 10,000 rows</button>
        </div>
        <div class="col-sm-6 smallpad">
          <button class="btn btn-primary btn-block" id="add" data-bind="add">Append 1,000 rows</button>
        </div>
        <div class="col-sm-6 smallpad">
          <button class="btn btn-primary btn-block" id="update" data-bind="update">Update every 10th row</button>
        </div>
        <div class="col-sm-6 smallpad">
          <button class="btn btn-primary btn-block" id="clear" data-bind="clear">Clear</button>
        </div>
        <div class="col-sm-6 smallpad">
          <button class="btn btn-primary btn-block" id="swaprows" data-bind="swapRows">Swap Rows</button>
        </div>
        </div>
      </div>
    </div>
  </div>
  <table class="table table-hover table-striped test-data">
    <tbody>
      {{ loop:data }}
      <tr data-bind="class.danger:data.*.selected">
        <td class="col-md-1">{{ data.*.id }}</td>
        <td class="col-md-4"><a data-bind="select">{{ data.*.label }}</a></td>
        <td class="col-md-1"><a data-bind="remove"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
        <td class="col-md-6"></td>
      </tr>
      {{ end: }}
    </tbody>
  </table>
</div>
<span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
`;

class ViewModel {
  data = [];
  selectedIndex = null;

  get "data.*.selected"() {
    return this.$1 === this.selectedIndex;
  }
  set "data.*.selected"(value) {
    if (value) {
      this.selectedIndex = this.$1;
    }
  }
  select(e, $1) {
    if (this.selectedIndex !== null) {
      this[`data.${this.selectedIndex}.selected`] = false;
    }
    this[`data.${$1}.selected`] = true;
  }
  remove(e, $1) {
    this.data = this.data.toSpliced($1, 1);
  }
  run() {
    this.data = buildData(1000);
    this.selectedIndex = null;
  }
  runLots() {
    this.data = buildData(10000);
    this.selectedIndex = null;
  }
  add() {
    this.data = this.data.concat(buildData(1000));
  }
  update() {
    for(let i = 0; i < this.data.length; i += 10) {
      this[`data.${i}.label`] += " !!!";     
    }
  }
  clear() {
    this.data = [];
  }
  swapRows() {
    if (this.data.length > 998) {
      [this["data.1"], this["data.998"]] = [this["data.998"], this["data.1"]];
    }
  }
}

export default { ViewModel, html };
