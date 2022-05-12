
<template>
  <div id="app">
    <Landing v-if="page == '/'" @page="getPage" :live="true"></Landing>

    <Story :slideCount="4" video="greenland.mp4" backgroundType="image" v-if="page == '/greenland'" heading="Greenland’s Vanishing Villages" caption="The Danish government’s push for modernization left many small Greenland hunting communities reeling, and now their women may never return." photosBy="Jonas Bendiksen" textBy="Kate Wheeling" name="Greenland" slug="greenland" :promo="greenlandPromo" :text="greenlandText" :images="greenlandImages" @page="getPage"></Story>

    <Story :slideCount="6" video="azerbaijan.mp4" backgroundType="image" v-if="page == '/azerbaijan'" heading="A Forgotten People" caption="Without the Azerbaijani government’s structural support and full recognition, the Talysh people fight to preserve their language and culture." photosBy="Emin Özmen" textBy="Elena Gooray" name="Azerbaijan" slug="azerbaijan" :promo="azerbaijanPromo" :text="azerbaijanText" :images="azerbaijanImages" @page="getPage"></Story>

    <Story :slideCount="5" video="borneo.mp4" backgroundType="video" v-if="page == '/borneo'" heading="Displacement in Sarawak" caption="The Malaysian government has routinely put private-sector interests and infrastructure projects ahead of the livelihoods of indigenous people." photosBy="Stuart Franklin" textBy="Francie Diep" name="Borneo" slug="borneo" :promo="borneoPromo" :text="borneoText" :images="borneoImages" @page="getPage"></Story>

    <Story :slideCount="3" video="honduras.mp4" backgroundType="video" v-if="page == '/honduras'" heading="Last Resort" caption="More than two centuries after settling in Honduras, the Garifuna people are still fighting for a place to raise their families." photosBy="Susan Meiselas" textBy="Sarah Kinosian" name="Honduras" slug="honduras" :promo="hondurasPromo" :text="hondurasText" :images="hondurasImages" @page="getPage"></Story>

    <Story :slideCount="4" video="philippines.mp4" backgroundType="video" v-if="page == '/philippines'" heading="A Retreat From Massacre" caption="The T’boli-Dulangan Manobo, an indigenous group in the Philippines, lived peacefully in the village of Sitio Datalbonglangon<span style='letter-spacing: -3px'>---  </span>until the country’s armed forces showed up." photosBy="Chien-Chi Chang" textBy="Max Ufberg" name="Philippines" slug="philippines" :promo="philippinesPromo" :text="philippinesText" :images="philippinesImages" @page="getPage"></Story>

    <Story :slideCount="5" video="tanzania.mp4" backgroundType="image" v-if="page == '/tanzania'" heading="The Disappearing Pastures of the Maasai" caption="In northern Tanzania, not far from the Kenyan border, the Maasai people are seeing their ancestral lands claimed by miners and the government<span style='letter-spacing: -3px'>---  </span>all amid a serious drought." photosBy="Thomas Dworzak" textBy="Ted Scheinman" name="Tanzania" slug="tanzania" :promo="tanzaniaPromo" :text="tanzaniaText" :images="tanzaniaImages" @page="getPage"></Story>
  </div>
</template>

<script>
import Landing from './components/Landing.vue'
import Story from './components/Story.vue'
import Map from './components/Map.vue'

export default {
  methods: {
    getPage: function(value) {
      this.$ga.page(value);
      var app = document.getElementById('app')
      if (value == window.location.pathname) return
      app.style.opacity = 0;
      window.setTimeout(function() {
        this.page = value;
        history.pushState('page', 'Pacific Stand', this.page);
        window.scrollTo(0,0)
        app.style.opacity = 1;
      }.bind(this), 300)
      return value
    }
  },
  data() {
    return {
      page: window.location.pathname,
      greenlandImages: [
        { url: require('./assets/g1.jpg'), alt: 'Ivalo Olsen, from Ilulissat, is the only teacher in Oqaatsut. She dreams of becoming a psychologist, which means she would have to study in Denmark or elsewhere abroad.' },
        { url: require('./assets/g2.jpg'), alt: 'Sixteen-year-old twins Sara and Stina Olsvig plan study abroad for a year in Denmark. Many of the students who study abroad don’t return to Greenland.' },
        { url: require('./assets/g4.jpg'), alt: 'A young woman on a hillside in one of the newer neighborhoods in Nuuk, Greenland’s capital.' },
        { url: require('./assets/g3.jpg'), alt: 'An abandoned playground swing set in the snow in Oqaatsut.' },
        { url: require('./assets/g5.jpg'), alt: '“Crosses in a cemetery in Nuuk. Greenland has one of the highest rates of suicide in the world, which researchers attribute in part to the fact that many people have difficulty finding their place at the crossroads of traditional and modern lifestyles.' },
        { url: require('./assets/g8.jpg'), alt: 'The town of Ilulissat, Greenland’s third largest, with a population 4,400.' },
        { url: require('./assets/g7.jpg'), alt: 'New apartment buildings catch the last rays of the sunset in Nuuk, which has a population of 17,500.' },
        { url: require('./assets/g9.jpg'), alt: ' Greenlandic musician Nive Nielsen returned to Greenland to raise her twin daughters.' },
        { url: require('./assets/g10.jpg'), alt: 'Paulus Gabrielsen hunts for grouse and rabbit outside Oqaatsut, where the traditional Greenlandic lifestyle, centered on male-dominated activities like hunting and fishing, still prevails.' },
        { url: require('./assets/g12.jpg'), alt: 'An aerial view of Oqaatsut.' },
        { url: require('./assets/g11.jpg'), alt: 'A group of men work to free a small fishing boat frozen in the ice in Ilulissat’s harbor.' },
        { url: require('./assets/g6.gif'), alt: 'Population distribution in Greenland over the years. (Source: The Government of Greenland’s <a href="https://naalakkersuisut.gl//~/media/Nanoq/Files/Attached%20Files/Finans/ENG/2017%20National%20Spatial%20Planning%20Report%20WEB.pdf">National Spatial Planning Report 2017</a>)' },
        { url: require('./assets/g13.jpg'), alt: 'A man crosses a crack in the ice in the inner harbor of Ilulissat.' },
        { url: require('./assets/g15.jpg'), alt: 'Young people play on an icy hillside in front of a neighborhood in Nuuk.' },
        { url: require('./assets/g14.jpg'), alt: 'A woman takes her daily walk across the frozen bay next to Oqaatsut.' },
        { url: require('./assets/g16.jpg'), alt: 'The iconic mountain of Sermitsiaq rises up behind a row of apartment buildings in Nuuk.' }
      ],
      greenlandText: [
        '<strong><span>Ivalo Olsen</span></strong> is the only teacher in Oqaatsut, a cluster of red, blue, and yellow buildings on the rocky western coast of Greenland.',

        'There are just five children enrolled in the village’s elementary school, aged six to 12. When the weather allows, Olsen enjoys the silence of the sleepy village during long walks on the ice, looking out at the icebergs floating in Disko Bay. But the winters are long, dark, and lonely. She wants to start a family of her own, but she’s found no romantic prospects among the city’s 22 voting-age adults. She plans to leave Oqaatsut when the school year ends.',

        'Oqaatsut’s population, like that of many of Greenland’s rural settlements, has been shrinking for decades. Many young Greenlanders are leaving small villages for more urban centers, both in Greenland and abroad, in search of educational and occupational opportunities that don’t exist in rural areas. Far more women leave than men.',

        'The trend began after World War II, when Demark, which first claimed Greenland in 1721, kicked off its efforts to modernize its Arctic colony. Danish men arrived in Greenland as civil servants and construction workers, and many returned to Denmark with Greenlandic wives. At its most extreme, the Danish plans to modernize the country involved forced urbanization. Entire communities were uprooted and resettled in larger towns like Nuuk (then known as Godthab), the capital city of Greenland. Today, many trace Greenland’s soaring rates of suicide and alcohol abuse back to this social upheaval.',

        'An island mostly under ice, Greenland has always been a treacherous place to live. Even today there are few roads between communities—residents must travel by air, boat, snowmobile, or dog sled. When the first European settlers arrived around 985 C.E., they found evidence that humans had been there but no living inhabitants. Some centuries later, the Arctic-adapted Thule Inuit people arrived from Canada and thrived in small, hunting-based communities until relatively recently. Just 80 years ago, nearly 70 percent of Greenlanders lived in small communities of fewer than 200 people; today, only 7 percent do.',

        'Traditional gender norms run deep in the small villages—men were hunters or fishermen, and women homemakers—and while women now participate in the labor market, those roles are still entrenched. As a result, there are few opportunities for educated women in the small villages, where traditionally male-oriented vocations like hunting and fishing still dominate.',

        '“The first who have the ability to move are the women, because they are capable of taking care of themselves,” says Julia Knudsen, who spent more than a decade living in Denmark after she left Greenland in 1999 to travel and get an education in computer science—a subject that was not offered at the time at the only full-fledged institution of higher education in the nation, the University of Greenland. “The ones who are left behind are mostly the men. Maybe they think they can only hunt, or don’t see themselves surviving in the big city.”',

        'All of the kids in Oqaatsut must leave if they are to continue their education. There are no secondary schools in the small village, and, in a few years’ time, when the youngest reaches eighth grade and heads to a bigger city for boarding school, the primary school could close.',

        '“I don’t know how the small village will be in 10 or 20 years,” Olsen says—and Oqaatsut is hardly the smallest village. Olsen wonders about the toll it takes on villages to watch their community fade. “I don’t worry about the students,” she says. “I’m more worried about all the adults who have been living here for their whole lives.”'
      ],
      greenlandPromo: {url: require('./assets/gpromo.jpg')},
      azerbaijanText: [
        '<strong><span>The museum’s main room</span></strong> looks like a market: hand-knit clothes and linens lined up on the floor; tables stacked with photographs, homemade dishware, a lone phonograph. The objects come from villagers in the town of Kakalos, Azerbaijan, where Farbiya Shabanova founded her theater-turned-cultural-museum more than 20 years ago.',

        'Shabanova—a 78-year-old fashion designer—wanted to build a space that preserves the history of residents in Kakalos, her hometown in southern Azerbaijan, where the majority of the country’s Talysh people live. An ethnic group indigenous to the area, for centuries the Talysh have lived mostly in farming communities centered around remote villages in the Talysh Mountains. Russia and Iran fought over sections of their territory during the Russo-Persian War in the early 19<sup>th</sup> century, and officially claimed different portions of it in the peace treaty that followed. The northern stretch became part of Azerbaijan upon the country’s independence from the Soviet Union in 1991.',

        'Since then, the Talysh of Azerbaijan have confronted a kind of identity crisis—called upon by the pressures of national loyalty to identify as Azeri, yet maintaining mountain traditions distinct from the rest of Azerbaijan, including speaking an Iranian dialect. The Talysh language, which most schools do not teach, is decreasingly useful for addressing one of the community’s major concerns: finding jobs. Many Talysh seek work in larger, non-Talysh speaking cities farther north, where they can make more money than they can by farming in their villages. As their land remains underdeveloped and economically isolated, their language, already classified by the United Nations as vulnerable, loses relevance. Uniquely Talysh traditions and cultural memory—which has mostly been passed down orally—have gone with it.',

        'Some Talysh activists have sought to protect their language and culture by pushing for land independence, in the form of an autonomous state. In 1993, a Talysh army colonel leading a small separatist movement proclaimed an independent Talysh-Mughan Autonomous Republic in the south. The republic ended just two months later, and the central Azerbaijani government arrested and imprisoned the colonel for treason. Since then, the government has devoted little attention and few resources to the community, and Talysh activists claim that their numbers are repeatedly undercounted in the national census.',

        'The movement for an independent state never went mainstream among the Talysh, though the idea of separatism has not quite died. Independent Talysh groups, led by members of the former Talysh-Mughan Autonomous Republic, joined the international Unrepresented Nations and Peoples Organization twice between 2005 and 2014. A Talysh Revival Movement reportedly gathered in Russia for an international conference on self-determination in 2016. But pushes for autonomy have struggled because of a nebulous sense of Talysh identity, according to ethnographers who have studied the region. Talysh people often express ambiguity toward their own sense of Talyshness. These responses, researchers have argued, reflect the long history of that identity being marginalized.',

        'Shabanova, however, expresses pride in her Talysh background, and she has channeled it into her museum. The exhibits present traditional local objects—like a painted box containing a woman’s dowry—and photographs of notable villagers. The museum also offers classes in Talysh dance and a community theater, which was the first museum component Shabanova launched. Two decades later, she received financial support from Azerbaijan’s Ministry of Culture and Tourism to expand the museum’s collection. She continues to work with women in town to run it; it’s an impossible job to manage alone, especially since she still works as a designer and costume-maker.',

        'While continuing her work as a fashion designer and dressmaker, Shabanova has watched all of her grandchildren and one of her sons go abroad for school, a fact she declares proudly. Of her four children, only that son, who is disabled, still lives in Kakalos. But she sees it as part of her job, as their mother, to reinforce their roots, both Talysh and Azerbaijani. “I tell my kids that no matter where you live now,” she says, “don’t forget Azerbaijani or Talysh language.”'
      ],
      azerbaijanImages: [
        { url: require('./assets/a4.jpg'), alt: 'A man and woman sit outside the Seydi Pir mausoleum in the Shaglakuche village, near Lankaran. Most Talysh people are Shia Muslim.' },
        { url: require('./assets/a6.jpg'), alt: 'Fishermen prepare their boat on an early morning in Lankaran, which borders the Caspian Sea.' },
        { url: require('./assets/a3.jpg'), alt: 'Girls pose after school in the Kakalos village.' },
        { url: require('./assets/a1.jpg'), alt: 'Farbiya Shabanova, 78, on her bed in Astara’s Kakalos village. Her family has lived in this area since her grandfather, originally from Baku, married a Talysh woman in the south.' },
        { url: require('./assets/a5.jpg'), alt: 'A woman chats with her daughter in the Seydi Pir mausoleum.' },
        { url: require('./assets/a2.gif'), alt: 'Kakalos at a glance.' },
        { url: require('./assets/a8.jpg'), alt: 'Taking a break from work in a tea field in the Osakuca village, outside Lankaran, the capital of the short-lived Talysh-Mughan Autonomous Republic' },
        { url: require('./assets/a7.jpg'), alt: 'Women pray after the death of a former lawyer in their region. After the death of their beloved ones, Talysh women and men mourn in separate rooms of the deceased’s house for three days.' },
        { url: require('./assets/a9.jpg'), alt: 'Women cook tandoor bread near a Lankaran market.' },
        { url: require('./assets/a10.jpg'), alt: 'A woman waits for the bus in Senceredi, a village in the southern Astara District of Azerbaijan, where many Talysh people live.' },
        { url: require('./assets/a11.jpg'), alt: 'Agazahir Hasanov, 56, and his wife Ulduz Hummetova, 48, at their home in the Lerik District, another Talysh region, where they raise cows and sheep and make a living selling milk and cheese.' },
        { url: require('./assets/a12.jpg'), alt: 'Sheep graze on hills in the Lerik District.' },
        { url: require('./assets/a13.jpg'), alt: 'Saray kisses Muhammed, the new husband of her daughter, Terane. It is common in southern Azerbaijan for girls to live with their parents until they marry.' },
        { url: require('./assets/a15.jpg'), alt: 'Behruz, 36, a telephone line repairman, on the phone in his home near Lankaran. Behruz’s father works in Russia for higher wages than he would earn back home; his mother maintained the family farm and home while raising their children.' },
        { url: require('./assets/a14.jpg'), alt: 'A billboard banner of Heydar Aliyev, former Azerbaijani president (1993-2003) seen near the road Talysh mountains in Lankaran.' },
        { url: require('./assets/a16.jpg'), alt: 'Kids walk two kilometers from where they live in Kislak village to go to school in a neighboring village.' },
        { url: require('./assets/a17.jpg'), alt: 'A woman prepares tea for the actors in the town theatre in Kakalos village.' },
        { url: require('./assets/a18.jpg'), alt: 'A man walks on train tracks near the Lankaran city center.' }
      ],
      azerbaijanPromo: {url: require('./assets/apromo.jpg')},
      borneoText: [
        '<strong><span>The rainforests of Sarawak</span></strong>—a Malaysian state located along the northwestern coast of the island of Borneo, facing the South China Sea—host some of the most contested land in the world. They are home to dozens of indigenous groups, including the Iban, Kayan, and Penan, who traditionally made their living hunting and gathering, fishing, or slash-and-burn farming. By Malaysian law, each group owns the land it customarily uses, but in practice, the state often claims swaths of forest for its own, offering licenses to private companies to log or farm it.',

        'In 1998, the government resettled around 10,000 indigenous forest-dwellers to make way for the state-sponsored Bakun Dam, but it never made good on promises of free housing and electricity, activists say. The three acres of farmland that families received as recompense doesn’t grow enough food to support them.',

        'The government is inclined to look out for companies’ interests, not forest people’s, says Harrison Ngau, an indigenous land-rights lawyer based in the Sarawak city of Miri. “These companies are the ... financing the election campaigns of the ruling political parties,” he says in an email.',

        'In response, indigenous groups have blockaded logging and plantation roads that run through their land. They’ve also filed hundreds of suits against companies and the government. Some of these cases have taken decades to resolve. In the meantime, timber harvesting and oil-palm plantations leave the forest degraded, unable to support the indigenous livelihoods it once did.',

        'Women often suffer the most. Traditionally, the Iban people grew rice and raised pigs and chickens, for their own use; they didn’t rely much on cash. Both men and women could own land and its resources. Things changed for the Iban village of Kampong Lebor, however, beginning in the 1990s, when an oil-palm company began clearing and planting land around the village. Residents sued, winning back about 10,000 acres in a judgment rendered in 2012. Because the returned area was already planted with mature oil palms, the villagers began selling palm fruit and earning monthly incomes. By court order, the proceeds went to the “head of the household,” usually a man. In two generations, Kampong Lebor moved from sustenance farming to a cash economy, and found its egalitarian gender relations overturned. The forest now produces cash primarily for men.',

        'Women from various Sarawak groups traditionally harvested rattan palms, processed them, and wove them into baskets and mats. But logging and monocrop plantings have made important native species harder to find. Now, they must buy and use plastic instead. Such material changes can have serious consequences. “If [groups] are able to continue to use and relate to their most prominent and culturally significant species, they will be better equipped to retain their cultural identity,” University of Victoria ethnobotanists Ann Garibaldi and Nancy Turner wrote in the journal <em>Ecology and Society</em> ethnobotanists Ann Garibaldi and Nancy Turner wrote in 2004. “Conversely, losing access to such species, or moving away from the knowledge about them, can foreshadow or symbolize a more drastic loss of language and culture.”',

        'For centuries, many Sarawak forest-dwellers lived in longhouses, wooden structures hundreds of feet in length where dozens of families lived together. Longhouses act as social and political units, and often the longhouse communities are the groups that bring land-rights cases to court, or plan blockades. Many of the houses are now partially abandoned, or serve as home only on weekends away from urban jobs.'
      ],
      borneoImages: [
        { url: require('./assets/b1.jpg'), alt: 'Uday in her garden, located on a tributary of the Rajang River. Uday and her husband, John, are Kayan and have moved several times since the state-sponsored Bakun Dam flooded their village.' },
        { url: require('./assets/b2.jpg'), alt: 'Paya, a Kayan, uses her feet to start weaving a plastic basket handle.' },
        { url: require('./assets/b3.jpg'), alt: 'Outflow from the Bakun Dam pounds into the Rajang River.' },
        { url: require('./assets/b4.jpg'), alt: 'Land that’s been logged, stripped bare, and terraced for palm oil plantations near to the Long Jaik longhouse near the Muran Dam.' },
        { url: require('./assets/b5.jpg'), alt: 'A pig’s head marks a blockade near an oil palm plantation.' },
        { url: require('./assets/b7.jpg'), alt: 'Harvesting oil palm fruits.' },
        { url: require('./assets/b6.jpg'), alt: 'Drying rice.' },
        { url: require('./assets/b8.jpg'), alt: 'One Penan boy cuts another’s hair on the veranda of their longhouse, Long Jaik. Long Jaik is in the midst of a legal land dispute with a company that sells timber and palm oil.' },
        { url: require('./assets/b9.jpg'), alt: 'Catrina Aki Lumbau in her kitchen.' },
        { url: require('./assets/b10.jpg'), alt: 'John, Uday’s husband, looks for fish after dark.' },
        { url: require('./assets/b11.jpg'), alt: 'Uday prepares cigarette papers made from banana leaves. She grows tobacco and makes cigarettes to sell.' },
        { url: require('./assets/b12.jpg'), alt: 'Fishing boats at the longhouse Uday and John have joined.' },
        { url: require('./assets/b13.jpg'), alt: 'Uday dries tobacco in the sun.' },
        { url: require('./assets/b14.jpg'), alt: 'Dead trees stand in the lake created by the Bakun Dam in 1998.' },
        { url: require('./assets/b15.jpg'), alt: 'Stranded trees, blanched and dying, along the Rajang river.' }
      ],
      borneoPromo: {url: require('./assets/bpromo.jpg')},
      hondurasText: [
        '<strong><span>The first cruise ship</span></strong> landed in Trujillo, Honduras, on October 15th, 2014—a 2,376-passenger Norwegian Cruise Line vessel with more than 1,000 crew members. It was the first realization of a grand tourism plan hatched by Canadian “Porn King” Randy Jorgensen, who had made his fortune operating adult video stores before expanding into real-estate investments.',

        'Since arriving in Trujillo in 1991, Jorgensen has bought more than 1,500 acres, including land that once belonged to the Garifuna, descendants of escaped African slaves and indigenous Caribbean tribes who—after a failed uprising on St. Vincent against the British in 1797—were forced to resettle in Honduras. Once the inhabitants of expansive strips of untouched greenery, virgin beaches, and ports right on the Caribbean Sea, the Garifuna have lost thousands of acres to greed, corruption, foreign business interests, and tourism.',

        'Jorgensen’s goal, in part, is to make Trujillo the go-to escape for thousands of foreign retirees, and his vision has attracted other foreign investors to Trujillo Bay. The Garifuna contend local mayors and community leaders have sold their land illegally and say they have been largely excluded from the resulting tourism profits.',

        'While Honduras has ratified several international declarations and conventions protecting the land rights of indigenous groups, the government has offered little support, arguing in international hearings that the Garifuna are immigrants, and therefore have no right to the land. Meanwhile, President Juan Orlando Hernandez, looking to reshape the country’s notorious reputation for violence with increased investment in development and resource extraction, has made it easier for outsiders to acquire property.',

        'The Garifuna culture is inextricably tied to the land. Each morning men walk down to the beach to fish, while women cook spreads of coconut bread, fish stew, and yucca. Theirs is a matrilineal society: Women pass on the knowledge, myths, and memories of the Garifuna people to the next generation. With their culture at stake, they are leading a movement to reclaim their ancestral lands through occupation. They are building homes and planting crops on territory they say is rightfully theirs. With each new effort, they beat drums to invoke their ancestors, who they believe will guide the fight to preserve their land.',

        'Remittances are crucial to the Garifuna. With little opportunity for employment, many Garifuna, mostly men, migrate to the United States. This often leaves Garifuna women like Paulina, 57, and Emiliana, 67, to wake up at 5 a.m. to harvest crops of yucca, banana, and coconut, the core ingredients of Garifuna cooking.',

        'Now some Garifuna men are returning to find the land where they planned to raise their children sold off. “I came back for a visit, but when I saw what was starting to happen I wanted to come back quickly because if I didn’t there wasn’t going to be anything left for us. I knew I had to come back and fight,” says Nerlin “Rocky” Noel. “We are losing our culture, and the land is an important part of that. It’s who we are, and it’s how we self-sustain.”',

        'Three years ago, Rocky and his brother Nilfor, who both lived in New York for nearly 20 years, established a settlement on a plot of land in the town of Santa Fe, which they named Wani Lee. Canadian investors who reportedly had plans to build a mall on the land threatened the men regularly. Two years ago, the police torched the provisional homes the brothers had built. In recent months, they’ve begun to rebuild.',

        '“We used to play on this land as kids. Now we can’t even step foot on it without a security guard kicking us off,” Rocky says, looking out over a beachfront lot across the street from Wani Lee, which was allegedly sold illegally. “My kids will never know what it’s like to play on this land, so I’ve got to give them something.”',

        'Elsa, Rocky’s partner, is the only woman living on the Wani Lee territory. All others left after the clash with police, afraid to return. “There’s no longer any land left in Santa Fe to live,” she says. “We need this and it’s ours. I hope to build my life on this land with my children.”',

        'The Wamua settlement in Guadalupe is the site of the most hotly contested land dispute in Trujillo Bay. Many Garifuna say the land at Wamua was illegally sold by a member of the community to Patrick Forseth, the part-owner and general manager of Carivida, a multinational tourism and real-estate company. Forseth, who lives in Honduras, contends that the government’s approval of the title transfer gives him legal claim to the land.',

        'In 2016, Medalime David and several other Garifuna began sleeping on the land to prevent Carivida from developing there. David was gathering wood to cook dinner one afternoon in November when police stormed the property and arrested her for land usurpation.',

        'A group of Garifuna still maintains a near-continuous presence in provisional housing on the Wamua land, with plans to build around 40 more permanent homes. Carivida has filed charges against several of their leaders, including David, who faces defamation and usurpation lawsuits, and is barred from leaving the country or visiting the site. “I feel like a prisoner,” she says.',

        'But she is undeterred. “Any conflict, we’ll be there with our drums and maracas, because guns we don’t have—just our culture, our hearts, and our ancestral instruments.”'
        ],
      hondurasImages: [
        { url: require('./assets/h3.jpg'), alt: 'The Alta Vista development property of Canadian investor Randy Jorgensen, in Guadalupe.' },
        { url: require('./assets/h2.jpg'), alt: 'British tourists from Banana Coast Tours visit Fortaleza de Santa Bárbara in Trujillo.' },
        { url: require('./assets/h1.gif'), alt: 'Trujillo at a glance.' },
        { url: require('./assets/h8.jpg'), alt: 'Emiliana, 67, harvesting yucca. She returned from the United States 10 years ago.' },
        { url: require('./assets/h7.jpg'), alt: 'Paulina, 57, harvesting and replanting yucca in Guadalupe.' },
        { url: require('./assets/h9.jpg'), alt: 'A local beach in Rio Esteban where fishermen launch daily.' },
        { url: require('./assets/h4.jpg'), alt: 'The resettlement community known as Wamua.' },
        { url: require('./assets/h5.jpg'), alt: 'A statue of Christopher Columbus on a lookout in Trujillo points to the spot where the explorer first landed on mainland Central America.' },
        { url: require('./assets/h6.jpg'), alt: 'A port managed by Dole, formerly Standard Fruit, to export green bananas and pineapple, near Trujillo.' },
        { url: require('./assets/h12.jpg'), alt: 'An anniversary mass in remembrance of a local Garifuna man.' },
        { url: require('./assets/h11.jpg'), alt: 'Julio Lino says he was shot during a land recuperation effort in 2011.' },
        { url: require('./assets/h10.jpg'), alt: 'A man builds a home on the contested site of Wani Lee in Santa Fee.' },
        { url: require('./assets/h13.jpg'), alt: 'Rocky’s partner, Elsa, in his mother’s home in Santa Fe.' },
        { url: require('./assets/h14.jpg'), alt: 'Medalime David, with her niece Yesli.' },
        { url: require('./assets/h15.jpg'), alt: 'Elsa’s daughter Mirsa on recuperated land.' }
      ],
      hondurasPromo: {url: require('./assets/hpromo.jpg')},
      philippinesText: [
        '<strong><span>Even now</span></strong>, so many months later, Sunang Diamante can remember the sulfurous reek of the gunpowder.',

        '“I was on my farm harvesting corn when the gunshots started,” she says. “The guns were being fired continuously.” It was the guns that killed her son, 23-year-old To Diamante.',

        'On the morning of December 3<sup>rd</sup>, 2017, members of the Armed Forces of the Philippines came to Sitio Datalbonglangon, a small village of around 33 families located in the Barangay Ned region of the South Cotabato province in the Philippines. Sitio Datalbonglangon was home to Sunang Diamante, 48, and her fellow T’boli-Dulangan Manobo—an indigenous people of the region. From here, reports vary: Sitio Datalbonglangon residents say the military representatives demanded that leaders of their community falsely claim an association with the New People’s Army, a communist guerilla wing operating in the country, and turn themselves in to authorities. The military maintains that those community members indeed were members of the NPA. Either way, the community leaders refused to facilitate their own arrest, and the disgruntled military representatives left in a huff.',

        'What’s not disputed is the bloodshed that followed. About 30 minutes later, gunshots rained down on the village from the surrounding hills. It was a piercing volley—one that villagers say continued for three days. All told, eight tribe members were killed, as were two soldiers.',

        '“All I know is the reason why the soldiers did this: because of our land,” Diamante says.',

        'Members of the T’boli-Dulangan Manobo insist the killings were motivated by greed. Nestled in rolling green hills, Barangay Ned has long held value to various logging, coal mining, and coffee companies in the country. Tribe members and human rights activists claim the massacre was essentially a government-backed land grab. They say the military’s insistence that the slain tribesmen were in the NPA is merely a cover-up. In April of 2018, President Rodrigo Duterte announced he would open up tribal lands throughout the country to private investors.',

        'The remaining T’boli-Dulangan Manobo fled Sitio Datalbonglangon. A place that was once teeming with life—bamboo homes, a crowded basketball court, a noisy daycare center—became a ghost town seemingly overnight. Some were eventually apprehended by the government, and remain under close guard by the military.',

        'Others, like Diamante, sought refuge at shelters in nearby Koronadal City, where they now live in crowded huts and sleep on cool floors.',

        'At night, Diamante can’t help but contemplate the loss of her child and her home. She always comes to the same conclusion: “I cannot think of any sins that we have committed to warrant such an attack.”'
      ],
      philippinesImages: [
        { url: require('./assets/p1.jpg'), alt: 'Sunang Diamante, whose son To was shot dead in December of 2017, fled her home for a sanctuary in Koronadal City.' },
        { url: require('./assets/p2.jpg'), alt: 'Seven-year-old Angelo Wali wraps himself in a banner depicting his late uncle, Victor Danyan, who was killed in the December shooting. Wali lives in the Koronadal City sanctuary.' },
        { url: require('./assets/p3.jpg'), alt: 'Inday Bantay, another survivor staying in the sanctuary in Koronadal City, lost her son during the shooting.' },
        { url: require('./assets/p4.jpg'), alt: 'Nelly Danyan sits with other survivors of the shooting in the sanctuary.' },
        { url: require('./assets/p5.jpg'), alt: 'The B’laan, another indigenous group, live on heavily coveted lands 50 miles away from Sitio Datalbonglangon. A B’laan girl plays on a beach near Bulol Kilot, one of many small fishing villages in the region.' },
        { url: require('./assets/p6.jpg'), alt: 'Children kneel under a spigot to bathe in the Koronadal City sanctuary.' },
        { url: require('./assets/p7.jpg'), alt: 'Assigned cooks must prepare enough rice and vegetables to feed the 70-some survivors staying in Koronadal City.' },
        { url: require('./assets/p8.jpg'), alt: 'Children from the B’laan tribe play in a creek near Bulol Kilot.' },
        { url: require('./assets/p9.jpg'), alt: 'Sanga-Minson, 64, surveys his recently reclaimed land, in the Barangay T’konel region.' },
        { url: require('./assets/p10.jpg'), alt: '37-year-old Carmela Ditan, with her daughter on her back, 64-year-old Mading Sanga, and 62-year-old Lendung Minson prepare to plant corn on their newly reclaimed land.' },
        { url: require('./assets/p11.jpg'), alt: 'B’laan women work on their land to prepare for the planting of corn and banana trees end of April.' },
        { url: require('./assets/p12.jpg'), alt: 'For the B’Laan of Bulol Kilot, the main source of livelihood is fishing. However, since many fishermen have ventured into Indonesian waters without proper permits, some of them have been jailed there.' },
        { url: require('./assets/p16.jpg'), alt: 'A raised right fist has become a symbol of solidarity among survivors living in the Koronadal City sanctuary.' },
        { url: require('./assets/p14.jpg'), alt: 'Inside an NGO-funded sanctuary at Roxas village in Koronadal City.' },
        { url: require('./assets/p15.jpg'), alt: 'Residents sleep at the Roxas village sanctuary in Koronadal City.' },
        { url: require('./assets/p13.gif'), alt: 'The South Cotabato province at a glance.' }
      ],
      philippinesPromo: {url: require('./assets/ppromo.jpg')},
      tanzaniaText: [
        'The ruby rush in the Longido district in northern Tanzania began in 2017, when a Maasai herder first plucked a handful of the sharp-pink and bloody-purple gems from a hole in the dry earth.',

        'The Maasai, a semi-nomadic pastoralist people, have become accustomed to others laying claim to their ancestral territory. In recent years, the government grabbed their land for game hunters and real-estate developers in Loliondo, several hours northwest. And now, the ruby miners have moved into Longido.',

        'The village of Mundarara is growing into something of a boomtown, with all the perils and promises that come with that condition. Residents say the character of the town has changed down to its very sounds: There’s now a constant buzzing and chattering around the tables in the village center, where locals haggle and sell tea and snacks to visiting ruby-seekers. In the distance, the natural stillness is pierced by the slow, persistent ring of mining tools.',

        'The Maasai raise livestock on migratory routes, a tradition imperiled by the surge of new activity in the region. Rubies have brought new commerce to Longido, but government evictions and the effects of climate change have forced the Maasai to seek new, often drought-ridden grazing routes for their sheep, goats, and cattle. They must travel farther with their flocks and herds and work longer hours than ever before. Many have reluctantly migrated to cities, some as far away as Dar es Salaam, a 12-hour drive southeast.',

        'Seventy-five kilometers to the east, in Eworendeke, government development, rather than mining, is forcing some Maasai out. In 2012, locals say, a government official used bureaucratic sleight of hand to trick them out of two-thirds of their land in a case that the villagers mean to take to court.',

        'In the face of a government that increasingly seems to want them gone, the Maasai of Mundarara and Eworendeke are determined to keep tending their flocks. One recent morning, a band of women walked in the first rays of dawn toward the village elder’s hut in Eworendeke, carrying a sheep they planned to sacrifice as a prayer for relief from the drought that has borne hard on this area of the country, and on East Africa more generally. In Maasai tradition, the sheep should ideally be completely black, with no splotches of any other color, and must be slaughtered within the confines of traditional fences in the middle of the village. The person chosen to slaughter the black sheep must be kind and generous, a friend to everyone in the village, and innocent of any murders. Before the slaughter, the women sang soft prayers. The knife did its work, and the sun began to rise.',
      ],
      tanzaniaImages: [
        { url: require('./assets/t4.jpg'), alt: 'Maasai women collect firewood.' },
        { url: require('./assets/t7.jpg'), alt: 'A Maasai market for sheep and goats.' },
        { url: require('./assets/t3.jpg'), alt: 'Local collectors look at images of rubies on a cellphone.' },
        { url: require('./assets/t1.jpg'), alt: 'Local Maasai ruby traders.' },
        { url: require('./assets/t6.gif'), alt: 'Rubies from Longido.' },
        { url: require('./assets/t10.jpg'), alt: 'Hanging out by the well in Eworendeke village.' },
        { url: require('./assets/t6.jpg'), alt: 'After they were evicted by force from their old home, this family moved from Mundarara to Kitarini. The husband has found some success in the ruby trade and is building a house and a restaurant.' },
        { url: require('./assets/t2.jpg'), alt: 'Sifting rubies next to a recently built mine in Mundarara.' },
        { url: require('./assets/t9.jpg'), alt: 'Displaced from her old home, this Maasai woman now lives in Eworendeke.' },
        { url: require('./assets/t8.jpg'), alt: 'Maasai women preparing the slaughtering of a sheep to ask for rain. A recent drought and the dislocation of their traditional grazing land has created difficulties.' },
        { url: require('./assets/t11.jpg'), alt: 'Preparing for the slaughter of a sheep.' },
        { url: require('./assets/t12.jpg'), alt: 'A Maasai woman photographed in Eworendeke village.' },
        { url: require('./assets/t13.jpg'), alt: 'Maasai women in Longido hold a group meeting to discuss the effects of evictions and the ruby boom.' },
        { url: require('./assets/t14.jpg'), alt: 'Carrying firewood.' },
        { url: require('./assets/t15.jpg'), alt: 'A Maasai woman, with her child, prepares for the slaughter of a sheep in Eworendeke village.' },
        { url: require('./assets/t16.jpg'), alt: '' }
      ],
      tanzaniaPromo: {url: require('./assets/tpromo.jpg')}
    }
  },
  components: {
    Landing,
    Story,
    Map
  },
  computed: {
    live: function() {
      var now = new Date().getTime();
      var liveTime = 1533643200000; // 8/7/2018, 5:00:00 AM PST

      if (now > liveTime) {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/fonts.css';

*, *:before, *:after {
  margin: 0;
  padding: 0;
  max-width: 100%;
  box-sizing: border-box;
}
p, h1, h2, h3, h4, h5, h6, ul, ol {
  * + & {
    margin-top: 32px;
  }
}
body {
  background: #000;
  color: #fff;
  overflow-x: hidden;
}
#app {
  width: 1600px;
  margin: 0 auto;
  max-height: 100vh;
  overflow: hidden;
  opacity: 1;
  transition: opacity 1s ease;
}
h1 {
  font-size: 48px;
  line-height: 0.9;
  @media (min-width: 1200px) {
    font-size: 64px;
  }
  @media (min-width: 1440px) {
    font-size: 84px;
  }
}
h2, label {
  font-size: 18px;
  line-height: 1.2;
}
h3 {
  font-size: 12px;
  line-height: 1.4;
}
h1, h2, h3 {
  font-weight: 700;
  font-family: Gotham, Arial, sans-serif;
  text-transform: uppercase;
}
.caption {
  font-family: Carbon, Georgia, serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.story-heading {
  font-weight: 400;
  font-family: 'Gastromond', Georgia, serif;
  text-transform: none;
  font-style: italic;
  letter-spacing: 0;
}
.accent {
  color: #C1BA83;
}
label {
  display: block;
  margin-bottom: 8px;
}
input {
  background: rgba(255,255,255,.9);
  border: 0;
  -webkit-appearance: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 10px;
  display: block;
  width: 420px;
  outline: 0;
}
strong {
  color: #f11f14;
  @extend .caption;
  position: relative;
  span {
    position: relative;
    z-index: 1;
  }
  &:before {
    position: absolute;
    width: 100%;
    height: 4px;
    background: #dcd9af;
    bottom: 0;
    left: 0;
    content: ' ';
    z-index: 0;
  }
}
a {
  text-decoration: none;
}
.image-caption a {
  color: #777777;
  text-decoration: underline
}
::-moz-selection { background: #000; color: #dcd9af }
::selection { background: #000; color: #dcd9af }
.label2 {
  position: relative;
  z-index: 999;
  color: #ff0202
}
</style>
