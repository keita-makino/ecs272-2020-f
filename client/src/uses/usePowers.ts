// import React from 'react';
// import { RecordSet } from '../types/LocationSet';

// const usePowers = (data?: RecordSet[]) => {
//   if (!data) {
//     return;
//   } else {
//     console.log(data);
//     const mock = data
//       .map(item =>
//         item.records.map(item2 => ({
//           type: item.name,
//           lat: item2.lat,
//           lng: item2.lng
//         }))
//       )
//       .flat(1);

//     var sets1 = [];
//     var sets2 = [];
//     var sets3 = [];
//     var sets4 = [];
//     var l1 = 0;
//     var l2 = 0;
//     var l3 = 0;
//     var l4 = 0;

//     for (var i = 0; i < 94; i += 1) {
//       if (mock[i].type === 'Food market') {
//         sets1.push(mock[i]);
//         l1 += 1;
//       } else if (mock[i].type === 'Bus stop') {
//         sets2.push(mock[i]);
//         l2 += 1;
//       } else if (mock[i].type === 'Restaurant') {
//         sets3.push(mock[i]);
//         l3 += 1;
//       } else if (mock[i].type === 'Medical clinic') {
//         sets4.push(mock[i]);
//         l4 += 1;
//       }
//     }

//     var sets = [];
//     sets[1] = sets1;
//     sets[2] = 'Food market';
//     var Ssets2 = [];
//     Ssets2[1] = sets2;
//     Ssets2[2] = 'Bus stop';
//     var Ssets3 = [];
//     Ssets3[1] = sets3;
//     Ssets3[2] = 'Restaurant';
//     var Ssets4 = [];
//     Ssets4[1] = sets4;
//     Ssets4[2] = 'Medical clinic';

//     sets = sets.concat(Ssets2);
//     sets = sets.concat(Ssets3);
//     sets = sets.concat(Ssets4);

//     console.log(sets);

//     var minLat = mock[0].lat;
//     var maxLat = mock[0].lat;

//     for (var i = 0; i < 94; i += 1) {
//       if (mock[i].lat < minLat) {
//         minLat = mock[i].lat;
//       } else if (mock[i].lat > maxLat) {
//         maxLat = mock[i].lat;
//       }
//     }

//     var minLng = mock[0].lng;
//     var maxLng = mock[0].lng;

//     for (var i = 0; i < 94; i += 1) {
//       if (mock[i].lng < minLng) {
//         minLng = mock[i].lng;
//       } else if (mock[i].lng > maxLng) {
//         maxLng = mock[i].lng;
//       }
//     }

//     var NumLng = 18;
//     var NumLat = (NumLng / 18) * 5;
//     var distanceLng = (maxLng - minLng) / NumLng;
//     var distanceLat = (maxLat - minLat) / NumLat;
//     var R1 = Math.sqrt(distanceLng ** 2 + distanceLat ** 2) * 1.5;
//     var R0 = Math.sqrt(distanceLng ** 2 + distanceLat ** 2) * 0.5;
//     var Lngpixelcenter = 0;
//     var Latpixelcenter = 0;
//     var EnergyArray1 = new Array();
//     var EnergyArray2 = new Array();
//     var EnergyArray3 = new Array();
//     var EnergyArray4 = new Array();
//     var w = 1;
//     var wedge = 1;
//     var wneg = -0.8;

//     var Energy_Food_market = new Array();
//     var Energy_Bus_Stop = new Array();
//     var Energy_Restaurant = new Array();
//     var Energy_Medical_clinic = new Array();

//     var indexclosest = [];
//     var distanceclosest = [];
//     for (var h = 0; h < l1; h += 1) {
//       var mindisnode1 = 1;
//       for (var hh = 0; hh < l1; hh += 1) {
//         if (
//           Math.sqrt(
//             (mock[h].lng - mock[hh].lng) ** 2 +
//               (mock[h].lat - mock[hh].lat) ** 2
//           ) < mindisnode1
//         ) {
//           if (
//             Math.sqrt(
//               (mock[h].lng - mock[hh].lng) ** 2 +
//                 (mock[h].lat - mock[hh].lat) ** 2
//             ) > 0
//           ) {
//             mindisnode1 = Math.sqrt(
//               (mock[h].lng - mock[hh].lng) ** 2 +
//                 (mock[h].lat - mock[hh].lat) ** 2
//             );
//             indexclosest[h] = hh;
//           }
//         }
//       }
//       distanceclosest[h] = mindisnode1;
//     }
//     for (var h = l1; h < l1 + l2; h += 1) {
//       var mindisnode1 = 1;
//       for (var hh = l1; hh < l1 + l2; hh += 1) {
//         if (
//           Math.sqrt(
//             (mock[h].lng - mock[hh].lng) ** 2 +
//               (mock[h].lat - mock[hh].lat) ** 2
//           ) < mindisnode1
//         ) {
//           if (
//             Math.sqrt(
//               (mock[h].lng - mock[hh].lng) ** 2 +
//                 (mock[h].lat - mock[hh].lat) ** 2
//             ) > 0
//           ) {
//             mindisnode1 = Math.sqrt(
//               (mock[h].lng - mock[hh].lng) ** 2 +
//                 (mock[h].lat - mock[hh].lat) ** 2
//             );
//             indexclosest[h] = hh;
//           }
//         }
//       }
//       distanceclosest[h] = mindisnode1;
//     }
//     for (var h = l1 + l2; h < l1 + l2 + l3; h += 1) {
//       var mindisnode1 = 1;
//       for (var hh = l1 + l2; hh < l1 + l2 + l3; hh += 1) {
//         if (
//           Math.sqrt(
//             (mock[h].lng - mock[hh].lng) ** 2 +
//               (mock[h].lat - mock[hh].lat) ** 2
//           ) < mindisnode1
//         ) {
//           if (
//             Math.sqrt(
//               (mock[h].lng - mock[hh].lng) ** 2 +
//                 (mock[h].lat - mock[hh].lat) ** 2
//             ) > 0
//           ) {
//             mindisnode1 = Math.sqrt(
//               (mock[h].lng - mock[hh].lng) ** 2 +
//                 (mock[h].lat - mock[hh].lat) ** 2
//             );
//             indexclosest[h] = hh;
//           }
//         }
//       }
//       distanceclosest[h] = mindisnode1;
//     }
//     for (var h = l1 + l2 + l3; h < l1 + l2 + l3 + l4; h += 1) {
//       var mindisnode1 = 1;
//       for (var hh = l1 + l2 + l3; hh < l1 + l2 + l3 + l4; hh += 1) {
//         if (
//           Math.sqrt(
//             (mock[h].lng - mock[hh].lng) ** 2 +
//               (mock[h].lat - mock[hh].lat) ** 2
//           ) < mindisnode1
//         ) {
//           if (
//             Math.sqrt(
//               (mock[h].lng - mock[hh].lng) ** 2 +
//                 (mock[h].lat - mock[hh].lat) ** 2
//             ) > 0
//           ) {
//             mindisnode1 = Math.sqrt(
//               (mock[h].lng - mock[hh].lng) ** 2 +
//                 (mock[h].lat - mock[hh].lat) ** 2
//             );
//             indexclosest[h] = hh;
//           }
//         }
//       }
//       distanceclosest[h] = mindisnode1;
//     }

//     for (var i = 0; i < NumLng; i += 1) {
//       EnergyArray1[i] = new Array();
//       EnergyArray2[i] = new Array();
//       EnergyArray3[i] = new Array();
//       EnergyArray4[i] = new Array();

//       Energy_Food_market[i] = new Array();
//       Energy_Bus_Stop[i] = new Array();
//       Energy_Restaurant[i] = new Array();
//       Energy_Medical_clinic[i] = new Array();

//       for (var j = 0; j < NumLat; j += 1) {
//         Lngpixelcenter = minLng + (i + 0.5) * distanceLng;
//         Latpixelcenter = minLat + (j + 0.5) * distanceLat;

//         EnergyArray1[i][j] = 0;
//         EnergyArray2[i][j] = 0;
//         EnergyArray3[i][j] = 0;
//         EnergyArray4[i][j] = 0;

//         Energy_Food_market[i][j] = new Array();
//         Energy_Bus_Stop[i][j] = new Array();
//         Energy_Restaurant[i][j] = new Array();
//         Energy_Medical_clinic[i][j] = new Array();

//         Energy_Food_market[i][j][0] = Lngpixelcenter;
//         Energy_Bus_Stop[i][j][0] = Lngpixelcenter;
//         Energy_Restaurant[i][j][0] = Lngpixelcenter;
//         Energy_Medical_clinic[i][j][0] = Lngpixelcenter;

//         Energy_Food_market[i][j][1] = Latpixelcenter;
//         Energy_Bus_Stop[i][j][1] = Latpixelcenter;
//         Energy_Restaurant[i][j][1] = Latpixelcenter;
//         Energy_Medical_clinic[i][j][1] = Latpixelcenter;

//         for (var k = 0; k < l1; k += 1) {
//           if (
//             Math.sqrt(
//               (mock[k].lng - Lngpixelcenter) ** 2 +
//                 (mock[k].lat - Latpixelcenter) ** 2
//             ) < R1
//           ) {
//             EnergyArray1[i][j] +=
//               (w *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray2[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray3[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray4[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             if (
//               Math.sqrt(
//                 (mock[indexclosest[k]].lng - Lngpixelcenter) ** 2 +
//                   (mock[indexclosest[k]].lat - Latpixelcenter) ** 2
//               ) < R1
//             ) {
//               EnergyArray1[i][j] +=
//                 (0.5 *
//                   wedge *
//                   (R1 -
//                     Math.sqrt(
//                       (mock[k].lng - Lngpixelcenter) ** 2 +
//                         (mock[k].lat - Latpixelcenter) ** 2
//                     )) **
//                     2) /
//                 (R1 - R0) ** 2;
//               EnergyArray1[i][j] +=
//                 (0.5 *
//                   wedge *
//                   (R1 -
//                     Math.sqrt(
//                       (mock[indexclosest[k]].lng - Lngpixelcenter) ** 2 +
//                         (mock[indexclosest[k]].lat - Latpixelcenter) ** 2
//                     )) **
//                     2) /
//                 (R1 - R0) ** 2;
//             }
//           }
//         }
//         for (var k = l1; k < l1 + l2; k += 1) {
//           if (
//             Math.sqrt(
//               (mock[k].lng - Lngpixelcenter) ** 2 +
//                 (mock[k].lat - Latpixelcenter) ** 2
//             ) < R1
//           ) {
//             EnergyArray1[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray2[i][j] +=
//               (w *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray3[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray4[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             if (
//               Math.sqrt(
//                 (mock[indexclosest[k]].lng - Lngpixelcenter) ** 2 +
//                   (mock[indexclosest[k]].lat - Latpixelcenter) ** 2
//               ) < R1
//             ) {
//               EnergyArray2[i][j] +=
//                 (0.5 *
//                   wedge *
//                   (R1 -
//                     Math.sqrt(
//                       (mock[k].lng - Lngpixelcenter) ** 2 +
//                         (mock[k].lat - Latpixelcenter) ** 2
//                     )) **
//                     2) /
//                 (R1 - R0) ** 2;
//               EnergyArray2[i][j] +=
//                 (0.5 *
//                   wedge *
//                   (R1 -
//                     Math.sqrt(
//                       (mock[indexclosest[k]].lng - Lngpixelcenter) ** 2 +
//                         (mock[indexclosest[k]].lat - Latpixelcenter) ** 2
//                     )) **
//                     2) /
//                 (R1 - R0) ** 2;
//             }
//           }
//         }
//         for (var k = l1 + l2; k < l1 + l2 + l3; k += 1) {
//           if (
//             Math.sqrt(
//               (mock[k].lng - Lngpixelcenter) ** 2 +
//                 (mock[k].lat - Latpixelcenter) ** 2
//             ) < R1
//           ) {
//             EnergyArray1[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray2[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray3[i][j] +=
//               (w *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray4[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             if (
//               Math.sqrt(
//                 (mock[indexclosest[k]].lng - Lngpixelcenter) ** 2 +
//                   (mock[indexclosest[k]].lat - Latpixelcenter) ** 2
//               ) < R1
//             ) {
//               EnergyArray3[i][j] +=
//                 (0.5 *
//                   wedge *
//                   (R1 -
//                     Math.sqrt(
//                       (mock[k].lng - Lngpixelcenter) ** 2 +
//                         (mock[k].lat - Latpixelcenter) ** 2
//                     )) **
//                     2) /
//                 (R1 - R0) ** 2;
//               EnergyArray3[i][j] +=
//                 (0.5 *
//                   wedge *
//                   (R1 -
//                     Math.sqrt(
//                       (mock[indexclosest[k]].lng - Lngpixelcenter) ** 2 +
//                         (mock[indexclosest[k]].lat - Latpixelcenter) ** 2
//                     )) **
//                     2) /
//                 (R1 - R0) ** 2;
//             }
//           }
//         }
//         for (var k = l1 + l2 + l3; k < l1 + l2 + l3 + l4; k += 1) {
//           if (
//             Math.sqrt(
//               (mock[k].lng - Lngpixelcenter) ** 2 +
//                 (mock[k].lat - Latpixelcenter) ** 2
//             ) < R1
//           ) {
//             EnergyArray1[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray2[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray3[i][j] +=
//               (wneg *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             EnergyArray4[i][j] +=
//               (w *
//                 (R1 -
//                   Math.sqrt(
//                     (mock[k].lng - Lngpixelcenter) ** 2 +
//                       (mock[k].lat - Latpixelcenter) ** 2
//                   )) **
//                   2) /
//               (R1 - R0) ** 2;
//             if (
//               Math.sqrt(
//                 (mock[indexclosest[k]].lng - Lngpixelcenter) ** 2 +
//                   (mock[indexclosest[k]].lat - Latpixelcenter) ** 2
//               ) < R1
//             ) {
//               EnergyArray4[i][j] +=
//                 (0.5 *
//                   wedge *
//                   (R1 -
//                     Math.sqrt(
//                       (mock[k].lng - Lngpixelcenter) ** 2 +
//                         (mock[k].lat - Latpixelcenter) ** 2
//                     )) **
//                     2) /
//                 (R1 - R0) ** 2;
//               EnergyArray4[i][j] +=
//                 (0.5 *
//                   wedge *
//                   (R1 -
//                     Math.sqrt(
//                       (mock[indexclosest[k]].lng - Lngpixelcenter) ** 2 +
//                         (mock[indexclosest[k]].lat - Latpixelcenter) ** 2
//                     )) **
//                     2) /
//                 (R1 - R0) ** 2;
//             }
//           }
//         }

//         Energy_Food_market[i][j][2] = EnergyArray1[i][j];
//         Energy_Bus_Stop[i][j][2] = EnergyArray2[i][j];
//         Energy_Restaurant[i][j][2] = EnergyArray3[i][j];
//         Energy_Medical_clinic[i][j][2] = EnergyArray4[i][j];
//       }
//     }

//     console.log(EnergyArray1);
//     console.log(EnergyArray2);
//     console.log(EnergyArray3);
//     console.log(EnergyArray4);

//     console.log(Energy_Food_market);
//     console.log(Energy_Bus_Stop);
//     console.log(Energy_Restaurant);
//     console.log(Energy_Medical_clinic);

//     return null;
//   }
// };

// export default usePowers;
