export function titleCase(str) {
  let word=str.trim()
  if (/\s/.test(word)) {
    word = word.toLowerCase();
    word = word.split(' ');
    for (var i = 0; i < word.length; i++) {
    word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1); 
    }
    return word.join(' '); } else if (!/\s/.test(word)){
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
  };

//   export async function getBounds(lat,lng,radiusInM){
//     console.log(lat, lng, radiusInM)
//     const bounds= geohashQueryBounds([lat,lng],radiusInM);
//     const promises=[]
//     const jobsRef=collection(db,'jobs')
//     for (const b of bounds){
//       console.log(b)
//       const q = query(jobsRef, orderBy('geohash'), startAfter(b[0]), endAt(b[1]));
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       promises.push(doc.data())
// });
//     }
//     console.log('promises',promises)
//     const matchingDocs=[];
//     for (const snap of promises){
//       const snapLat = snap.latitude
//       const snapLng = snap.longitude
//       const distanceInKm = distanceBetween([snapLat, snapLng], [lat,lng]);
//       const distanceInM = distanceInKm * 1000;
//         if (distanceInM <= radiusInM) {
//           matchingDocs.push(snap);
//             }
//     }
//     console.log('matching docs',matchingDocs)
//     // start paginate
//       const slice_lst =matchingDocs.slice(offset, offset+perPage)
//       setSlice([...slice_lst]);
//       setPageCount(Math.ceil(matchingDocs.length/perPage))
//       // end paginate
//     setmyjobs([...matchingDocs]);
//     setFilterOnly([...matchingDocs]);
   
// }
