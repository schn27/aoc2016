"use strict";

function calc() {
	const list = optimizeList(getSortedList(input));	
	return getMinimalAllowedIp(list) + " " + getNumberOfAllowedIps(list);
}

function getMinimalAllowedIp(list) {
	return list[0][0] == 0 ? list[0][1] + 1 : 0;
}

function getNumberOfAllowedIps(list) {
	return Math.pow(2, 32) - list.reduce((s, e) => s + e[1] - e[0] + 1, 0);
}

function optimizeList(list) {
	let optimizedList = [];

	list.forEach(range => {
		if (optimizedList.length == 0) {
			optimizedList.push(range);
		} else {
			let prevRange = optimizedList[optimizedList.length - 1];
			if (range[0] > prevRange[1] + 1) {
				optimizedList.push(range);
			} else if (range[1] > prevRange[1]) {
				prevRange[1] = range[1];
			}
		}
	});

	return optimizedList;
}

function getSortedList(listText) {
	return input.split("\n").map(line => line.split("-").map(Number))
		.sort((a, b) => (a[0] != b[0]) ? a[0] - b[0] : a[1] - b[1]);
}

const input = `1873924193-1879728099
2042754084-2076891856
4112318198-4113899685
1039794493-1057170966
3791841434-3797494664
1518668516-1518748952
1946127596-1953926346
4058215215-4086224696
3429681642-3455096313
2599576643-2604275147
1800210010-1801990849
1761160149-1766904471
2774395403-2774748831
1520470679-1542287000
2343327790-2346083217
1628052281-1630209458
100577752-127518854
671383949-696948197
2144689921-2169898850
3606633683-3608925912
2109791040-2110314929
492539485-512327909
1364276172-1365041569
3467175303-3467618102
460580113-466381680
813074193-837921910
5537006-14606952
946065544-951330790
989372718-991282302
200009261-205932238
3798271597-3801031905
2216207343-2242110933
848423835-848853657
1748754108-1786349744
2399831275-2450914999
1663535391-1664405521
892515306-898828394
2880137661-2888009771
3365333945-3374605152
987036370-998814590
3892148601-3897753835
2284996682-2304337355
308020918-314394785
538685495-544373302
1823596335-1824819464
971809355-983694756
284716926-285879421
3637637036-3652853727
1916553349-1918781150
696948199-701183905
2108894965-2110155929
368081079-369068299
1528668961-1565706834
3711148791-3721773623
3379988898-3419009907
75796957-84367940
1622153638-1627375599
1660472686-1675015684
1153621810-1160895822
2031612525-2032051797
1150487328-1153453006
300933544-307215112
3189667528-3205813479
2693102773-2697432888
2923748650-2931308011
2512953216-2519005204
1651098254-1660472685
3988605837-4016033187
270425249-275430325
649608587-651366398
2880152810-2894023332
3367065179-3368964916
1137467603-1160465160
3378838178-3379988897
1912841207-1913884949
3734505169-3755988948
1518708042-1518847704
1930577208-1944584155
2869986404-2909986632
424121138-428248387
1827165738-1840620936
324495276-330189246
2521490885-2526000948
1513153698-1513536552
3156724300-3177963150
2737600184-2746832287
2597645418-2602897419
1972314551-1997656153
1468081450-1492108957
3217469337-3227811437
2456382583-2459166080
4038379151-4038960518
3984707942-3986223942
1514736329-1515006318
1410942019-1420373476
3943044250-3945907963
1675015686-1680347958
1182759348-1204636005
1547041264-1574284229
3998227842-4000267869
2719765570-2731840505
2003729668-2031612524
1124274530-1124952970
2710016978-2729083584
2697048351-2697545869
3249954687-3258412725
1177795536-1179734693
1063172514-1063568483
3919426754-3928084951
2649727243-2651783771
420545813-425492876
2187511660-2189532955
1332771672-1337238856
2559522941-2561165264
3611794421-3612100974
990434095-991061744
3311767249-3323759965
2082306404-2087247912
977081397-983520148
2700457093-2722036558
889804703-901273822
3281975407-3288376938
1900859-2087697
3359024113-3364297429
1488620946-1499185913
3095850063-3110957137
2924020651-2934105636
3480872005-3500207692
3265576322-3273927552
3886295152-3887811607
479600661-482552524
2077800379-2083424063
479438989-482498799
2205762-2390846
967070257-969400280
1780626494-1795356535
336050227-362501040
2066894356-2070157688
2711664519-2715211035
2739426388-2743490521
50566643-67435318
138963898-142290410
3017544167-3021132102
1133322944-1136596047
2992711187-3011792444
1356144684-1358533149
3298716765-3308644329
3812682402-3820212811
3364246396-3378838176
3605560680-3611803358
4161229768-4199248942
250277160-269792207
4022334281-4042792788
1479138689-1496448606
4067103958-4097402008
324353383-330107603
3460719560-3465121559
3357509623-3363501925
1676179664-1681316839
334302095-368081077
4041856791-4049650625
1095104172-1110817036
4263462943-4271423497
35238773-42649255
1995738612-2003729666
1145121134-1165576620
3121753822-3122940047
781223110-789178753
284412404-308020917
477369326-481964268
3611852163-3612014702
559316688-567907435
2705313585-2714787801
3161761475-3200072999
3671560806-3676498689
4112794252-4113970604
3458327475-3459250050
655022836-671383948
269792208-273225169
420746448-424787078
1620238298-1621937312
3618192415-3628252830
3887811608-3909810672
3807511962-3807557825
2947393390-2972353230
647054999-650847928
2035631680-2072674057
1293223106-1312776798
3616108547-3618041359
2524866696-2552983326
14606953-15778021
1200129106-1204922922
1577044819-1580263124
4223248135-4236928477
785470440-799681933
1888528109-1893336449
1122685939-1130099493
176561814-176701662
2519417187-2544323712
1122274583-1124137383
2957029658-2981009221
650915504-653475697
210247196-220200437
3797007953-3799783891
488327867-501225193
130651124-139866418
864076535-878798307
2760435654-2774208779
3103916066-3116559183
333917748-334285405
3430587881-3441615730
148086799-159397502
3798409655-3803475476
526468312-538164764
849018009-849596864
1442223118-1445044517
4263319428-4270436586
4112399576-4113547944
1978346741-1979488526
2283224279-2300553570
1152488821-1156120463
1390496843-1417003046
333587527-333646376
1585558620-1620238296
1803018238-1806854806
2925788498-2926548045
2712474658-2720901711
1196989900-1202719311
3952755624-3956970495
4103476761-4116483698
4057768470-4058215214
2710635380-2712069704
2101903120-2104154726
1442132763-1443362285
420330272-435610317
1431487556-1438515826
974145635-978447714
2021691721-2021705237
3569348094-3574217716
3016610743-3017615483
3772028933-3779583364
1394699060-1428446963
1515382747-1517187741
1049613498-1051047136
95646179-95720807
539901377-559316686
987536084-989075921
2009566992-2023431090
3459250051-3467175301
751560448-758586987
1073411728-1105472904
1131007779-1149933404
3674686507-3683472345
990594635-991997118
3468204111-3517888339
4141956472-4146201368
4060795160-4061262187
3057468879-3067720704
3165290543-3166404174
292172493-311377330
180601389-183326808
2951935860-2964576062
3673461712-3677351195
1036920441-1060628630
774260375-779314232
3734215825-3767700406
2033080178-2042754083
3954694001-3983601982
1737269170-1739584124
2513146725-2514600051
1135918433-1160858115
820957565-836393612
284896641-290792716
1412008407-1412622240
1550150096-1561746360
824382476-832032406
208456629-208524145
917736511-921005775
1823540463-1824143249
1274319639-1299239254
3855584417-3886295150
3531103253-3549118849
3267509957-3280095405
3540252288-3544997898
701952217-712878128
3446951203-3458327473
1551465958-1557177842
2745906803-2747647252
3282589918-3311767247
3765332261-3776919677
2165412917-2173968511
109358635-124305239
3212676972-3214315203
3326533847-3326810005
3920666694-3926929222
650309182-651544046
708098735-714454173
572511501-574452217
449508527-454545623
1942601982-1949448687
2064046021-2067447600
333151198-333393337
1574284231-1585558619
698322352-703120196
148229752-172697920
3267988563-3273485517
2032217907-2033036948
3862068873-3870249341
919713318-922163670
155662841-162963144
1394140453-1430957514
2873677871-2896542230
37916329-39253788
681670311-687826081
1719299314-1735498986
461628210-471865324
2517128070-2524600375
3080279788-3095850061
2097814073-2101401036
3442936490-3446270960
2860573369-2869986403
1450009722-1454375183
2677633624-2700457091
1116524230-1120647931
2198429635-2200634071
333679323-334302094
172697922-180250781
3568670472-3600780676
2567650852-2571689819
3991524157-4018198632
1320088804-1336761048
1441441574-1447722009
4070063946-4077134102
1518303291-1518757627
789712274-793961738
537271530-539849150
2749214451-2751716398
1252243784-1253382137
3549118851-3568670471
2608002055-2649178024
849424472-849667326
1662868529-1665937308
3347147435-3361850347
1977046180-1978396522
1510301697-1514872861
2809612788-2812017542
699757461-733301324
4145771441-4156192606
3853363014-3855584416
3237664679-3239097359
2265041728-2281659545
2146272587-2151730776
2375706172-2397802671
1219402849-1230826128
2125488963-2136467252
183326810-242569486
2147340-14658906
242569487-250277158
3014720726-3015174849
1689217997-1697645738
26620759-31443699
1696477009-1704667294
3628252831-3659254482
988172886-990269879
4134312523-4146938756
4110871648-4112682586
1977409651-1982693985
1053361409-1060474644
2101489104-2102003463
1966318308-1995738611
510056428-510157967
854676429-872751220
856029593-876424461
1471353586-1474887569
2450915001-2456382582
1407555501-1408047605
527722980-547224258
3280095407-3282589917
2909986634-2916837990
1232996245-1253914471
31086557-35734834
1694910589-1711998895
762305366-775159488
1225774520-1228140780
257330043-270391498
3915486327-3923103539
1926249337-1966318306
1178971023-1183248004
116510673-132805111
1915704972-1922908375
969412073-979230383
3986223944-3991524156
405494083-449508526
1670274140-1672828275
4255322589-4265083226
2615943647-2628573870
253900156-264130685
812381326-838878231
3676068147-3678805855
4018198634-4020002159
927634473-956957738
1728404615-1731917611
4027974514-4050074007
1698299296-1698622868
2149508758-2160191833
1160737915-1174189471
3381967104-3399337635
4057735038-4057925711
3659254484-3672311596
4064241135-4070650968
973353987-978907985
1174189473-1179817409
698277114-706179803
2873214132-2883076783
1857579377-1865963654
4218815063-4232049540
464623007-466732505
145258734-149921134
1776765373-1785155753
2328728331-2345665378
255225324-269092529
2079410577-2083947272
3797389909-3799120406
2956534572-2957931629
3744749430-3770715654
560693405-572304095
2372761028-2393875166
706179804-740943515
1875539946-1877484014
633634731-644741930
3683472347-3694077033
3701974775-3724779161
2848467395-2852263066
3730366567-3730989122
2117254263-2130476988
3698750668-3698975786
2746832288-2751564814
253658494-259116334
2364532781-2372761027
456714135-461505875
3672275679-3674478931
2522406078-2531544560
792035582-793138494
69154638-75829014
2926548046-2947393388
4220770598-4239648140
1231191898-1231698394
2032945297-2033080176
1447304643-1450009720
849303213-849636806
2580161324-2586439081
869920911-871138045
3327278827-3328956868
2987830862-3004476243
1578256762-1596421560
3725920649-3734505168
177635071-179461239
2984672502-2992711186
55507652-68823687
2455788859-2455936061
2701657503-2734666015
3602006162-3608766950
4116793339-4145771440
3461179167-3461527047
2087698-2122623
2291815799-2296911924
2596260797-2599637238
741177583-762305365
1918475929-1919207177
4170813079-4175037031
2122624-2315281
1253914472-1274319637
2487150877-2509030416
3379861818-3416060190
333646378-334048524
2326969860-2360851304
337863211-360992608
3074050973-3092995408
3110957138-3120916334
33876232-35227157
1797203899-1797849973
730720453-733433538
857489932-864404088
1829927048-1847707809
2772398259-2781857468
1244316186-1259999059
3462793245-3462944813
2182652-2214508
1060628631-1062482015
2925598220-2926530972
900674266-922436488
1178662480-1184341164
2459166082-2504309844
1910189689-1913976941
4220927757-4234807086
3969999207-3974656835
3775545128-3782028606
2734332905-2737600182
1729489128-1733660501
4156192608-4161893257
162824624-169481809
3146103157-3203151235
4041586778-4048136958
4203009505-4224632535
1110882582-1113030824
3913795915-3942297002
2271387462-2272232473
517350158-526962459
779314234-785470439
1916548840-1918281992
1888889-1904062
2664310740-2677633623
1893488044-1910189687
2242110935-2265041727
3498906702-3502025359
4258143098-4268731878
2397802673-2398500769
572676036-572701832
1446041312-1447304642
3826077985-3829627277
4020002160-4047217761
1380452883-1429557315
4047082396-4050677020
3921624009-3929261229
2619033943-2632247390
2455802505-2455982302
4224632536-4255322587
897555132-906210835
881604485-889804702
3516964473-3523121967
2304512438-2307555454
3820151660-3853363012
3820170090-3827290700
3249983509-3250443047
988351392-990103337
2740868594-2743074820
2405403685-2447661661
823437467-829851419
937422032-942832643
971602506-976542623
785880816-801146210
4277743826-4294967295
1220312589-1225494571
3067720705-3089970954
2791983488-2809612786
2591514716-2602768599
3354140278-3357144795
2995080913-3008383912
3107886744-3116206353
2390847-5537005
3203151236-3210148830
2525591016-2552221661
3356499587-3362877956
3942297003-3943746936
2369635408-2396711414
644741932-645492895
1465863404-1482131479
3943121023-3944346698
2561165265-2591514714
19449263-35238772
1082566831-1083675917
2197161910-2198528564
2826493138-2860573367
2504309845-2512953214
1627066830-1642274044
2883117929-2903014292
583190345-633634730
2973540042-2982443255
3699440664-3713677655
3746896292-3760652269
3171099262-3180938498
572697766-572756080
3988852854-3988997069
4265083227-4277743824
383972777-401061270
945475099-953801412
3528634603-3542351915
2300856021-2308581946
3122557350-3124419305
660165472-664987050
32790502-34209087
2851805721-2855373838
992214332-997255508
2732719831-2735572206
3868474597-3881441121
333379670-333580739
3381334635-3388608632
3563089705-3573594471
3210148832-3237664678
1187695934-1194142092
1438515828-1446601852
991039829-1027395932
848648599-849082618
3736687746-3774570916
8407552-13762041
2232234823-2235394467
1755371838-1765328838
1110605895-1112786421
1829011713-1846414725
1125629499-1131007777
1620448623-1622231718
1819546669-1857579375
2574044802-2579190543
44327412-53557883
743188265-775219027
2088304828-2108894963
2115234805-2135895690
3661589550-3667328781
948393409-961955386
3296787727-3307575232
591649479-623936900
3127688079-3134369195
3121554064-3122386341
4265181650-4265802278
95671345-95744284
3632933123-3652082814
2602768600-2608002053
855428909-878230687
518821859-527722979
3164805808-3166272976
1503827162-1509814674
1083143813-1083702538
1454375184-1479743870
3323759966-3345377938
3252601419-3261416869
659490354-659624437
2690988793-2694240575
2925030178-2926498213
3724779163-3731382232
2817808230-2826493137
3611600625-3612000729
1922908377-1926249336
3054727190-3057468877
2318069658-2349685562
1224408645-1230905383
3426646140-3446265909
3698560892-3703351760
3893285255-3897654014
3334017866-3341652536
3467542284-3468204110
3552641883-3560193935
1577860113-1616147289
792385239-798544023
3524508765-3535502551
2079154753-2079647911
3662660030-3676294372
1974333295-1989116976
2349685563-2364532779
1179711637-1180870951
657058762-689503958
2751716400-2791983487
2281659547-2300856020
3745499151-3746841127
3568050533-3573507136
3124419306-3133154818
707480362-726334537
2792898927-2805591285
2110314930-2140259502
3790557838-3790821659
3034617264-3054755435
2119833193-2126798390
956957739-965040695
3105127325-3113783343
2203526166-2216207342
3893109545-3895690030
1953185341-1954544580
1149483814-1151080437
2397990602-2399831274
2529540174-2531766027
3040682810-3045957235
1080702276-1112990581
2454727672-2455707974
3120916336-3122292317
1540361624-1570029586
2048523135-2052071542
1038796864-1046952356
3954274530-3958300763
2472916352-2505189818
1108664119-1110283066
3909810674-3932704041
2986410650-3000522702
2126923951-2133118178
2619513661-2648860446
745808816-752461748
2032570613-2033017246
1225966324-1231538269
1177964744-1181712502
1761008098-1766235040
3298803758-3306723635
2021641434-2024692738
1595091669-1612372139
1941821906-1960762898
2186311939-2194297020
47802669-62393198
1123500672-1124070782
2910564254-2926504746
3124929968-3130520163
3226077340-3228054324
1636675883-1644581701
1346992603-1348129673
4080421115-4101064153
1798120143-1801945969
180334939-181524921
68823688-83563926
3020761343-3021817567
1279065904-1316503183
2153948447-2169932701
3115629813-3118656717
2825214732-2828305578
2984310864-2990997583
178717970-179503517
2058539536-2067010739
3016814756-3017670406
2730476137-2736514991
39687255-44327410
3428187444-3429514630
165353608-170252815
1928294039-1947673816
2481282831-2501238225
998819145-1005462099
1752276551-1784480513
146652512-151673725
1362119775-1365250964
4160738180-4163750066
2314088362-2338653170
1298996094-1311546715
4132326237-4144090012
1254561821-1268295556
3803475478-3820151659
2093541493-2097966199
95572083-95700288
2084930491-2104963206
1333016590-1349983110
24509125-41294028
2813496284-2815951003
3170619802-3176056931
1123756904-1124832163
687462919-689373049
4160933120-4167201363
898320180-905022052
1005799857-1023924764
977044645-979628011
74989273-84281783
4212107733-4215081511
1323282537-1349961316
198929657-199463525
60359856-83903508
1535382902-1566104279
1062354273-1063440138
180250782-180836870
810842896-830439133
1815521836-1821199497
2410396425-2413223137
3005164082-3012157652
614154154-639131835
2368126375-2376371375
848742116-853217530
2812452191-2816536085
453271322-456714133
3782382849-3794182243
1231863689-1232996243
1698500883-1699628705
2837831808-2854116172
325784764-332571920
2681945893-2692689494
2242318868-2276515328
615372556-633018840
174537037-175706165
4265180056-4265548452
1946782676-1948030232
3090555846-3091254399
4075367556-4081807898
966697131-967647806
975982130-978678992
381622091-383401034
3694077034-3718390721
3066767367-3091060238
921048198-924193336
2247293647-2269423767
1518267616-1518511723
1338166110-1354456999
1457454398-1510301695
1118885758-1124129968
3782028608-3782877419
3794182244-3799566334
338019282-348095336
2882633741-2901934705
4141186961-4142165287
645486416-645944383
352101084-364591159
3600780678-3606937835
2683090964-2684370557
3541047853-3541994869
3333084429-3334030102
3126194199-3129935758
371339342-373806460
1230932008-1232187292
208470214-209193118
1354457001-1371635555
2173968513-2181884574
1918021371-1919110200
2812017543-2817808228
2724336622-2730653841
2649178025-2660374286
0-1888888
4267087346-4275541579
1247902155-1260953714
142290412-148229751
2532554358-2540855042
1795356537-1803018237
2249829541-2251006359
3239097361-3267410980
1806854808-1819546668
3368852506-3373277857
2454288937-2454315837
381773593-384357154
2406382908-2442196465
430251075-444680559
3603771632-3607267790
3032227327-3040030225
1515154393-1518755420
1135736946-1144990739
38376160-41665021
15778022-19449261
1429557316-1434743652
77180981-88138768
1371635556-1380452881
841305901-841404555
2722036559-2726308166
3172206472-3185876600
1299239255-1320088802
1725854117-1744385026
996320481-1012998985
1181698174-1215279334
3811104408-3827985303
3333480667-3334132994
333516020-333617177
3033812452-3036695198
88138770-130651123
2307295212-2314088360
3893795432-3898571061
4028277165-4057735036
3122390571-3125913885
1114116644-1125629498
3249674305-3250304612
853217531-881604483
3386154033-3411882529
201141111-231074692
1049202442-1050466108
3445599644-3446951202
1179668312-1183015015
3255408881-3258664273
1976455908-1981569398
1952856244-1954468652
2666556582-2696725230
2031809521-2032325253
2934698477-2934714455
567907436-583190343
1140499208-1145440329
482552525-517350156
645492896-655022834
2306386691-2307678393
95538211-95699883
1865963655-1896438172
3014938823-3017205093
664741090-683754272
1539845876-1547041263
2569184033-2569739585
2596632054-2606025914
2568570852-2589262191
3914231660-3927512695
461505876-477369324
1514872862-1520470677
1298955403-1302935547
2340961777-2357367276
1421012173-1422211362
1911306751-1915704971
1622231719-1651098252
1111783809-1114116642
801146212-841305900
1184341165-1219402847
208515089-208552663
113739263-118476142
1716816645-1725854116
717297025-730844938
2260605394-2268237426
2469379666-2484990280
1891682888-1896393627
2268097794-2279310973
1872987167-1876038388
3922364684-3927485573
870013786-874312926
487920315-496959388
2300879142-2309452712
3339096993-3347147433
2376318475-2387155565
853636490-865748846
1489714174-1498479204
2378938290-2394510167
671771167-680588355
3307872338-3309633505
2333653700-2351930363
1256216667-1271177293
275430327-303429552
841404557-850304042
2223088279-2236937230
649410540-651327653
2655227264-2664310738
3896607653-3902120279
2981077775-2984310862
2220986676-2230179027
3653104767-3654804499
4169345300-4203009503
754983804-774841798
659376850-659571678
3009855031-3010464245
4220535116-4240517613
3503171717-3503206049
3122936808-3128912932
55099720-72174340
1970582126-1980928849
3999140749-4011567231
2540135228-2548563437
486840577-493667077
3421523242-3436385357
304620939-307244601
3584674908-3594238408
3857534623-3859943891
1681316840-1713630743
1083260069-1083705127
3124888764-3146103155
1189498321-1216312827
1552856847-1563782649
3008845968-3009980589
2079074374-2082559497
4110762479-4111056886
990957769-992049690
3782547468-3791579659
3012157654-3020860593
3665026148-3676239424
992049691-1026588637
3524660322-3531103252
1878298966-1882615092
3923196013-3942202205
2578473159-2584766311
90607936-122424387
3540610321-3541605330
3979731432-3982143719
828074268-833118498
1488736510-1488749429
1300869665-1307542773
1877663796-1888931788
4167201364-4190293895
3265098769-3267509956
4064016721-4074827871
2100409724-2101804552
4214567163-4233290691
189717203-231296345
3164583326-3164801067
1744385028-1770167107
4121108358-4145079404
753388973-777355343
3164636578-3164954504
4116483700-4133896167
33752855-34032233
4111742153-4113213993
1043487579-1054622271
3021132103-3046193303
3164839823-3180738585
4103181605-4105869442
754905815-761743025
1952665910-1953433270
2314883517-2324534151
2993732550-3009897818
3420873563-3423164569
2810181095-2811456553
2010165801-2023812035
1885135264-1889950507
4144857306-4153676723
869398480-871470963
1105472905-1110869617
314394787-318243942
3503101007-3503172522
4159475284-4194909281
2191923377-2203526164
896676315-921551112
304481071-305508611
984250575-987645320
4101064155-4103439647
3419009909-3446424945
547023756-549064661
4282390963-4283810466
977739722-984250573
3152153827-3180871559
2183409610-2198198790
1912187897-1912964610
4288558455-4293415604
650443681-652917734
2810679676-2811896595
4284399257-4290240034
3945907965-3977860104
896507573-927634471
2594571102-2596729241
650340896-651904869
3663512068-3674686506
1702145201-1716816643
4102028316-4103476760
2140259504-2143344425
3889682782-3898950708
3242636904-3246887557
11174641-18449276
290513163-292256515
1062125199-1073411726
2412362250-2415099013
422226966-428387779
3306156-16019348
3305613991-3308042567
3523121969-3528068884
3523265294-3525005629
1149933405-1152331697
2087247913-2100886247
2691075518-2693026017
3356323513-3364246395
373151936-405494081
369068300-381423906
1025569374-1036920439
3252901420-3270033863
2719048254-2735630821
1766292061-1780626493
848394147-848657039
420719565-431765901
1514895780-1515289801
2519005205-2557015796
740943517-747508062
2972353231-2983357025
967792496-971809354
824340711-829628532
965040697-966871284
1486637472-1496349918
2543366907-2559522939
3320919376-3333042521
1150347115-1155284378
2181884575-2200064456
990865894-991355669
2692987724-2694585947
3288275136-3307945139
3616593385-3618107349
3565775907-3597807291
3444367535-3446735109
561517921-574215242
1337238857-1349083727
991010485-991631272
315759690-333151197
462446579-465758715
1684699734-1706672921
1230826129-1231575999
3617829061-3618192413
3601718684-3616108546
3408662775-3410669980
1780045799-1783004862
217154892-241204500
4135176740-4147913097
460349581-465632949
3194132621-3200446332
620532470-637639642
3984428673-3986115872
782503719-796872832
3983601983-3985969366
3014748925-3034829048
3403049585-3409700128
4139874731-4143631115
2140849733-2153948446
2934672189-2934698845
572351719-575778209
2076891858-2081262092`;
