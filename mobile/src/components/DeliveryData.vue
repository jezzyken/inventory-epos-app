<template>
  <slot>
  </slot>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Test",
          address: "address test",
          status: "pending",
          recipient: "test",
          note: "test",
          orders: [
            {
              id: 1,
              unit: "kg",
              item: "1 set of kidney",
            },
          ],
        },
        {
          id: 1,
          name: "Test",
          address: "address test",
          status: "pending",
          recipient: "test",
          note: "test",
          orders: [
            {
              id: 1,
              unit: "kg",
              item: "1 set of kidney",
            },
          ],
        },
        {
          id: 1,
          name: "Test",
          address: "address test",
          status: "delivered",
          recipient: "test",
          note: "test",
          orders: [
            {
              id: 1,
              unit: "kg",
              item: "cock for figthing",
            },
            {
              id: 1,
              unit: "kg",
              item: "1 ball of fury",
            },
          ],
        },
      ],
    };
  },
  provide () {
    return {
      data: this.items
    }
  }
};
</script>
