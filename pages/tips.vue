<template>
  <div class="flex flex-col justify-center mb-4">
    <h1 class="text-xl font-semibold">För att det ska gå bättre nästa gång:</h1>
    <p v-if="$route.params.reason">{{ tips[$route.params.reason] }}</p>
  </div>
</template>

<script lang="ts">
const tips = {
  0: "Innan du börjar printen kom ihåg att kolla att det finns tillräckligt med filament på rullen\n -Du kan i exporten i flashPrint se hur många meter filament printern behöver.",
  1: "Du kan kolla innan du börjar printa att filamentet inte har en befintilig spricka.\n -Om möjligt kolla till printen och se om filamentet gått av under tiden, i stå fall Kan du bara mata in den avbrutna änden i inmatningen när den delen i printetn når matningen.",
  2: "Kan beror på att printern är felkalibrerad och printade på för hög höjd, då kan man gå in i printerns inställningar och kalibrera. \n -Kan vara dåligt fäste mot bottenplanan, går då att limma plattan med vanligt papperslim.",
  3: "",
  4: "Kom ihåg att placera supports i flashprint\n -Kom ihåg att ta med supports när du slicear",
  5: "",
  6: "",
  7: "Du kan använda verktyg så som fil och kniv att justera felmarginalerna på din print\n -Kom ihåg att ha med lite felmarginaler när du ritar upp din fil. Det bästa är då att mäta hur stort felet var. Oftast brukar felmarginaler på ca 0.5mm bli bra.",
  8: "Kan bero på att strömmen till printern stängdes av under printing, inte mycke man själv kan påverka\n -Någon avbröt din print. Kan bero på att den såg ett fel komma. Se till att ha ditt namn först i filnamnet så kan man säga till dig om det händer. Man har även rätt att stänga av någon annans print oavsett anledning om man inte har sitt namn i filen.",
  9: "",
  10: "Kom ihåg att ha rätt inställningar när du exporterar från Inventor. Enheter i millimeter och upplösning high. \n -Kontrollera slicen ser bra ut i flashprint och att enheter m.m. är rätt inställt. \n -Se till att mata ut USB minnet korrekt",
  11: "Se till att H tillräckligt tjocka väggar och delar i inventor. Rekommenderat är över 1.5mm i de flesta fallen.\n -Försök kontrollera att printern kunde matas ordentligt. Kan bero på att printern inte fick tillräckligt med filament. ",
  12: " Var försiktig i lossning, använd verktygen som finns tillgängliga. Adventure plattorna gåt att böja vilket ofta är enklare.\n -Se till att ha en reaktivt hållbar botten. Är din botten tunn/bräcklig försök rotera så du har en hållbarare sida ner eller testa att använda en raft.",
};

export default {
  setup() {
    return { tips };
  },
};
</script>
