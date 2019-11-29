<template>
<b-card no-body class="overflow-hidden" style="max-width: 800px; min-width: 600px;">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="item.thumbnail" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body :title="item.street">
          <b-card-text>
            {{item.description}}
          </b-card-text>
          <b-card-text>

          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
  <!-- <div>
    <div class="col-xs-12 col-sm-3 col-md-3 result_img">
      <img class="img-responsive result_img" :src="item.thumbnail" alt="image not found" />
    </div>
    <div class="col-xs-12 col-sm-9 col-md-9">
      <h4>{{displayText}}</h4>
      <div class="resultDescription">{{item.description}}</div>
      <ul class="resultProperties">
        <li class="resultProperties__money">
          <i class="fa fa-money" aria-hidden="true"></i>
          <span>{{item.price}}</span>
        </li>
        <li class="resultProperties__home">
          <i class="fa fa-home" aria-hidden="true"></i>
          <span>
            {{item.sqft}}ft
            <sup>2</sup>
          </span>
        </li>
        <li class="resultProperties__bed">
          <i class="fa fa-bed" aria-hidden="true"></i>
          <span>{{item.beds}}</span>
        </li>
        <li class="resultProperties__bath">
          <i class="fa fa-bath" aria-hidden="true"></i>
          <span>{{item.baths}}</span>
        </li>
      </ul>
    </div>
  </div> -->
</template>

<script>
export default {
  props: [
    'item',
  ],
};
</script>
