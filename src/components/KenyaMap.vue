<template>
    <div class="w-full">
      <div id="map" class="h-[70vh] w-full z-0!"></div>
    </div>
</template>
  
<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  
  import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
  import markerIcon from 'leaflet/dist/images/marker-icon.png';
  import markerShadow from 'leaflet/dist/images/marker-shadow.png';
  
  let map = null;
  
  onMounted(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
    });
  
    map = L.map('map').setView([1.2921, 36.8219], 6);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    L.marker([1.2921, 36.8219])
      .addTo(map)
      .bindPopup('Kenya')
      .openPopup();
  
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  });
  
  onUnmounted(() => {
    if (map) {
      map.remove();
      map = null;
    }
  });
</script>