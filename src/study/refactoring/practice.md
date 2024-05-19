# 실습

## 변수 인라인하기 - item price_total

```js
@@ -158,3 +158,3 @@
-                  <big><strong style="white-space: nowrap;">{{ getItemPriceTotal(item) | money }}</strong></big>
-                  <span v-if="getItemRegularDiscountRatio(item) !== 1">
-                    {{ (getItemPriceTotal(item) / getItemRegularDiscountRatio(item)).toFixed() | comma }}
+                  <big><strong style="white-space: nowrap;">{{ item.price_total | money }}</strong></big>
+                  <span v-if="item.regular_price_discount_ratio !== 1">
+                    {{ (item.price_total / item.regular_price_discount_ratio).toFixed() | comma }}
@@ -251,3 +251,3 @@
-                  <big><strong style="white-space: nowrap;">{{ getItemPriceTotal(item) | money }}</strong></big>
-                  <span v-if="getItemRegularDiscountRatio(item) !== 1">
-                    {{ (getItemPriceTotal(item) / getItemRegularDiscountRatio(item)).toFixed() | comma }}
+                  <big><strong style="white-space: nowrap;">{{ item.price_total | money }}</strong></big>
+                  <span v-if="item.regular_price_discount_ratio !== 1">
+                    {{ (item.price_total / item.regular_price_discount_ratio).toFixed() | comma }}
@@ -363,2 +363,2 @@
-                    <span v-if="getItemRegularDiscountRatio(item) !== 1">
-                      {{ (getItemPriceTotal(item) / getItemRegularDiscountRatio(item)).toFixed() | comma }}
+                    <span v-if="item.regular_price_discount_ratio !== 1">
+                      {{ (item.price_total / item.regular_price_discount_ratio).toFixed() | comma }}
@@ -366 +366 @@
-                    <big><strong style="white-space: nowrap;">{{ getItemPriceTotal(item) | money }}</strong></big>
+                    <big><strong style="white-space: nowrap;">{{ item.price_total | money }}</strong></big>
@@ -463,2 +463,2 @@
-                    <span v-if="getItemRegularDiscountRatio(item) !== 1">
-                      {{ (getItemPriceTotal(item) / getItemRegularDiscountRatio(item)).toFixed() | comma }}
+                    <span v-if="item.regular_price_discount_ratio !== 1">
+                      {{ (item.price_total / item.regular_price_discount_ratio).toFixed() | comma }}
@@ -466 +466 @@
-                    <big><strong style="white-space: nowrap;">{{ getItemPriceTotal(item) | money }}</strong></big>
+                    <big><strong style="white-space: nowrap;">{{ item.price_total | money }}</strong></big>
@@ -809,0 +810,2 @@ export default {
+      subtotal: 0,
+      regularPriceTotal: 0,
@@ -817 +819 @@ export default {
-      isDownloadbleCouponsLoading: false,
+      isDownloadbleCouponsLoading: true,
@@ -948 +950 @@ export default {
-          return acc + this.getItemPriceTotal(item)
+          return acc + item.price_total
@@ -1028 +1030 @@ export default {
-      return this.grades?.find(({ level }) => level === this.$store.state.market.customerInfo?.level)
+      return this.grades?.find(({ level }) => level === this.customer?.level)
@@ -1076,0 +1079,4 @@ export default {
+    EventBus.$on('addItemToCart', async () => {
+      await this.loadCartInfo(this.$store.state.user.info.customerId)
+      this.selectAllCartItems()
+    })
@@ -1078,0 +1085 @@ export default {
+      this.isDownloadbleCouponsLoading = true
@@ -1079,0 +1087,5 @@ export default {
+      this.cezerin.customers.retrieve(customerId).then(({ status, json }) => {
+        if (status !== 200) return
+
+        this.customer = json
+      })
@@ -1097,4 +1108,0 @@ export default {
-    EventBus.$on('addItemToCart', async () => {
-      await this.loadCartInfo(this.$store.state.user.info.customerId)
-      this.selectAllCartItems()
-    })
@@ -1110 +1118 @@ export default {
-      handler: function (newVal) {
+      handler: function (newVal, oldVal) {
@@ -1111,0 +1120,30 @@ export default {
+          let items = newVal.items
+          // 물품가 소계
+          var subtotal = 0
+          let discountTotal = 0
+          let regularPriceTotal = 0
+          let priceTotal = 0
+          for (var i = 0; i < items.length; i++) {
+            let item = items[i]
+            this.cart.items[i].price_total = item.quantity * item.price
+            subtotal += this.cart.items[i].price_total
+
+            // MARK: 할인을 하지 않는 상품은 sale_price의 값이 0입니다.
+            if (item.product.sale_price > 0) {
+              this.cart.items[i].discount_total = item.quantity * (item.product.regular_price - item.product.sale_price)
+              discountTotal += this.cart.items[i].discount_total
+            }
+            this.cart.items[i].regular_price_total = item.quantity * item.product.regular_price
+            this.cart.items[i].price_total = item.price_total
+            this.cart.items[i].regular_price_discount_ratio = ((item.product?.sale_price || item.product?.price) / (item.product?.regular_price || 0)) || 0
+            regularPriceTotal += this.cart.items[i].regular_price_total
+            priceTotal += this.cart.items[i].price_total
+          }
+          this.cart.subtotal = subtotal
+          this.cart.discount_total = discountTotal
+          this.cart.regularPriceTotal = regularPriceTotal
+          this.cart.price_total = priceTotal
+          this.cart.grand_total = subtotal + this.cart.shipping_total
+
+          // 배송비 소계
+          this.cart.shipping_total = this.getShippingPrice(this.cart.items)
@@ -1121,0 +1160,10 @@ export default {
+          this.cartLoading = false
+          return
+        }
+        // MARK: 카트를 전부 비웠을 때 금액 표기값을 모두 0으로 설정합니다.
+        if (newVal.items.length === 0) {
+          this.cart.regularPriceTotal = 0
+          this.cart.price_total = 0
+          this.cart.discount_total = 0
+          this.cart.shipping_total = 0
+          this.cart.grand_total = 0
@@ -1122,0 +1171 @@ export default {
+        this.isDownloadbleCouponsLoading = false
@@ -1132,0 +1182,4 @@ export default {
+        this.regularPriceTotal = selectedItems.reduce((regularPriceTotal, item) => {
+          return regularPriceTotal + item.regular_price_total
+        }, 0)
+
@@ -1134 +1187,5 @@ export default {
-          return priceTotal + this.getItemPriceTotal(item)
+          return priceTotal + item.price_total
+        }, 0)
+
+        this.subtotal = selectedItems.reduce((subtotal, item) => {
+          return subtotal + item.price_total
@@ -1139,2 +1196,2 @@ export default {
-          ((this.getItemPriceTotal(item) / this.getItemRegularDiscountRatio(item)).toFixed() -
-          this.getItemPriceTotal(item))
+          ((item.price_total / item.regular_price_discount_ratio).toFixed() -
+          item.price_total)
@@ -1439,2 +1495,0 @@ export default {
-
-        return !!promisesTotal.length
@@ -1449,20 +1504,15 @@ export default {
-      const shouldRefresh = await this.adjustCartQuantityToStock(orderDetailInfo.order)
-
-      if (shouldRefresh) {
-        const { order: refreshedOrder } = await this.getOrderDetail(orderDetailInfo.order.id, {itemStatus: true})
-        // 기존 레거시 로직을 위해서 데이터 변형
-        refreshedOrder.items.forEach((item) => {
-          item.attributes = item.product.attributes
-        })
-        // MARK: 품절로 인하여 장바구니에서 삭제 될 시 selectedItemsMap에서 삭제한다.
-        const refreshedOrderItemIds = refreshedOrder.items.map(item => item.id)
-        this.selectedItemsMap = Object.keys(this.selectedItemsMap).reduce((acc, currentKey) => {
-          if (refreshedOrderItemIds.includes(currentKey)) {
-            acc[currentKey] = this.selectedItemsMap[currentKey]
-          }
-          return acc
-        }, {})
-        return refreshedOrder
-      }
-
-      return orderDetailInfo.order
+      await this.adjustCartQuantityToStock(orderDetailInfo.order)
+      const { order: refreshedOrder } = await this.getOrderDetail(orderDetailInfo.order.id, {itemStatus: true})
+      // 기존 레거시 로직을 위해서 데이터 변형
+      refreshedOrder.items.forEach((item) => {
+        item.attributes = item.product.attributes
+      })
+      // MARK: 품절로 인하여 장바구니에서 삭제 될 시 selectedItemsMap에서 삭제한다.
+      const refreshedOrderItemIds = refreshedOrder.items.map(item => item.id)
+      this.selectedItemsMap = Object.keys(this.selectedItemsMap).reduce((acc, currentKey) => {
+        if (refreshedOrderItemIds.includes(currentKey)) {
+          acc[currentKey] = this.selectedItemsMap[currentKey]
+        }
+        return acc
+      }, {})
+      return refreshedOrder
@@ -1598,2 +1647,0 @@ export default {
-      this.isDownloadbleCouponsLoading = true
-
@@ -1823 +1871 @@ export default {
-          targetPrice += this.getItemPriceTotal(item)
+          targetPrice += item.price_total
@@ -1983,14 +2030,0 @@ export default {
-    },
-    getItemPriceTotal: function (item) {
-      return item.quantity * item.price
-    },
-    getItemRegularDiscountRatio: function (item) {
-      if (!item.product) {
-        return 0
-      }
-
-      if (!item.product.regular_price) {
-        return 0
-      }
-
-      return (item.product.sale_price || item.product.price) / item.product.regular_price
```