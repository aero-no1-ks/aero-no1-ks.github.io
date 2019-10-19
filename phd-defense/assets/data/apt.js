const apt = [["#DA","TUS","MKE","BOS","STL","CLE","ATL","MSP","BUF","MFR","BTM","#SF","#CH","#HU","HNL","RIC","COS","GSO","ILM","#NY","#MI","PHX","SAN","TPA","SYR","MLB","RST","IAG","COU","FLO","HGR","MCE","#LA","CMH","RNO","TTN","ABE","DTW","AUS","CHA","ROA","PVD","PWM","LIT","BGR","EWN","HVN","EKO","PNS","SWF","CLT","PDX","PBI","BOI","MRY"],["#DA","TUS","MKE","BOS","STL","CLE","ATL","MSP","BUF","MFR","BTM","#SF","#CH","#HU","HNL","RIC","COS","GSO","ILM","#NY","#MI","PHX","SAN","TPA","SYR","MLB","RST","IAG","COU","FLO","HGR","MCE","#LA","CMH","RNO","TTN","ABE","DTW","AUS","CHA","ROA","PVD","PWM","LIT","BGR","EWN","HVN","EKO","PNS","SWF","CLT","PDX","PBI","BOI","MRY","BNA","MEM","CHS","MYR","MSN","DAY","BTV","LBB","FAR","PSC","AMA","BIS","TRI","BRO","LYH","YKM","TYR","COD","ABR","GCC","SPN","ATY","CYS","PDT","RIW","SLC","ABQ","ORF","ELP","ITO","FSD","RDM","BLI","LBE","LSE","PUW","CKB","IPT","DIK","CDC","LAR","JMS","YNG","JAC","AEX","PSE","PHL","IND","BDL","OMA","OKC","LGB","GEG","BHM","DSM","ROC","CAK","BIL","BTR","SBA","DAB","FNT","EYW","MLI","MFE","SBN","GNV","TVC","SBP","GJT","LFT","EVV","GTF","BMI","EGE","MOT","LAN","ELM","DLH","AZO","LNK","SCK","HLN","BFL","MLU","SUN","YUM","ACK","CLL","GRI","MHK","VLD","JLN","ABY","TXK","ART","ESC","MEI","IMT","HIB","MKG","OTH","APN","HYA","PRC","PVC","PQI","AUG","BHB","CDR","DDC","HVR","IPL","IYK","MSL","MSS","OLF","#WA","MCO","ALB","AZA","VPS","MAF","MSO","FWA","AGS","JNU","FSM","PGV","OGD","PLN","ALS","CNM","IRK","LAS","SAT","PIT","SDF","TUL","SAV","PIE","PSP","FAT","BZN","SRQ","MDT","LEX","CAE","SGF","MOB","GPT","BLV","SAF","PVU","EAT","BET","ALW","DHN","CSG","SUX","GCK","HOB","RKS","INL","BFF","CDB","RUT","EWB","GLH","SLK","SVC","RDU","SFB","MHT","ISP","HPN","ACY","EUG","HRL","LCK","MBS","CPR","GUM","ACV","ACT","SJT","DBQ","SWO","PAH","CGI","PIR","EAR","GGW","CEC","RKD","SPB","SEA","CVG","PGD","CID","LWS","SBY","PIH","BQK","RDD","RHI","BPT","EAU","PUB","LBL","TBN","MWA","AIA","CMI","GGG","VEL","DEC","TVF","MSY","OGG","STS","DRO","MTJ","RFD","ORH","PSM","BJI","LNY","MKK","IFP","LEB","MCK","SOW"],["#DA","TUS","MKE","BOS","STL","CLE","ATL","MSP","BUF","MFR","BTM","#SF","#CH","#HU","HNL","RIC","COS","GSO","ILM","#NY","#MI","PHX","SAN","TPA","SYR","MLB","RST","IAG","COU","FLO","HGR","MCE","#LA","CMH","RNO","TTN","ABE","DTW","AUS","CHA","ROA","PVD","PWM","LIT","BGR","EWN","HVN","EKO","PNS","SWF","CLT","PDX","PBI","BOI","MRY","BNA","MEM","CHS","MYR","MSN","DAY","BTV","LBB","FAR","PSC","AMA","BIS","TRI","BRO","LYH","YKM","TYR","COD","ABR","GCC","SPN","ATY","CYS","PDT","RIW","SLC","ABQ","ORF","ELP","ITO","FSD","RDM","BLI","LBE","LSE","PUW","CKB","IPT","DIK","CDC","LAR","JMS","YNG","JAC","AEX","PSE","PHL","IND","BDL","OMA","OKC","LGB","GEG","BHM","DSM","ROC","CAK","BIL","BTR","SBA","DAB","FNT","EYW","MLI","MFE","SBN","GNV","TVC","SBP","GJT","LFT","EVV","GTF","BMI","EGE","MOT","LAN","ELM","DLH","AZO","LNK","SCK","HLN","BFL","MLU","SUN","YUM","ACK","CLL","GRI","MHK","VLD","JLN","ABY","TXK","ART","ESC","MEI","IMT","HIB","MKG","OTH","APN","HYA","PRC","PVC","PQI","AUG","BHB","CDR","DDC","HVR","IPL","IYK","MSL","MSS","OLF","#WA","MCO","ALB","AZA","VPS","MAF","MSO","FWA","AGS","JNU","FSM","PGV","OGD","PLN","ALS","CNM","IRK","LAS","SAT","PIT","SDF","TUL","SAV","PIE","PSP","FAT","BZN","SRQ","MDT","LEX","CAE","SGF","MOB","GPT","BLV","SAF","PVU","EAT","BET","ALW","DHN","CSG","SUX","GCK","HOB","RKS","INL","BFF","CDB","RUT","EWB","GLH","SLK","SVC","RDU","SFB","MHT","ISP","HPN","ACY","EUG","HRL","LCK","MBS","CPR","GUM","ACV","ACT","SJT","DBQ","SWO","PAH","CGI","PIR","EAR","GGW","CEC","RKD","SPB","SEA","CVG","PGD","CID","LWS","SBY","PIH","BQK","RDD","RHI","BPT","EAU","PUB","LBL","TBN","MWA","AIA","CMI","GGG","VEL","DEC","TVF","MSY","OGG","STS","DRO","MTJ","RFD","ORH","PSM","BJI","LNY","MKK","IFP","LEB","MCK","SOW","AVP","CRW","ITH","SPI","OTZ","GUC","SMX","MMH","OGS","ALO","ENA","UIN","HOM","ANI","FMN","MAZ","MCG","STT","GRB","PHF","STX","FLG","ADQ","LAW","TWF","BRD","CMX","FCA","ASE","FAY","ISN","OWB","CDV","YAK","GST","ADK","CEZ","LIH","PIA","RAP","GRK","BGM","DUT","DLG","GAM","HNM","ANC","FAI","SDY","WMO","SHV","HTS","ERI","VDZ","ICT","ABI","MUE","AKN","SJU","CHO","TOL","MCI","OME","PPG"],["#DA","TUS","MKE","BOS","STL","CLE","ATL","MSP","BUF","MFR","BTM","#SF","#CH","#HU","HNL","RIC","COS","GSO","ILM","#NY","#MI","PHX","SAN","TPA","SYR","MLB","RST","IAG","COU","FLO","HGR","MCE","#LA","CMH","RNO","TTN","ABE","DTW","AUS","CHA","ROA","PVD","PWM","LIT","BGR","EWN","HVN","EKO","PNS","SWF","CLT","PDX","PBI","BOI","MRY","BNA","MEM","CHS","MYR","MSN","DAY","BTV","LBB","FAR","PSC","AMA","BIS","TRI","BRO","LYH","YKM","TYR","COD","ABR","GCC","SPN","ATY","CYS","PDT","RIW","SLC","ABQ","ORF","ELP","ITO","FSD","RDM","BLI","LBE","LSE","PUW","CKB","IPT","DIK","CDC","LAR","JMS","YNG","JAC","AEX","PSE","PHL","IND","BDL","OMA","OKC","LGB","GEG","BHM","DSM","ROC","CAK","BIL","BTR","SBA","DAB","FNT","EYW","MLI","MFE","SBN","GNV","TVC","SBP","GJT","LFT","EVV","GTF","BMI","EGE","MOT","LAN","ELM","DLH","AZO","LNK","SCK","HLN","BFL","MLU","SUN","YUM","ACK","CLL","GRI","MHK","VLD","JLN","ABY","TXK","ART","ESC","MEI","IMT","HIB","MKG","OTH","APN","HYA","PRC","PVC","PQI","AUG","BHB","CDR","DDC","HVR","IPL","IYK","MSL","MSS","OLF","#WA","MCO","ALB","AZA","VPS","MAF","MSO","FWA","AGS","JNU","FSM","PGV","OGD","PLN","ALS","CNM","IRK","LAS","SAT","PIT","SDF","TUL","SAV","PIE","PSP","FAT","BZN","SRQ","MDT","LEX","CAE","SGF","MOB","GPT","BLV","SAF","PVU","EAT","BET","ALW","DHN","CSG","SUX","GCK","HOB","RKS","INL","BFF","CDB","RUT","EWB","GLH","SLK","SVC","RDU","SFB","MHT","ISP","HPN","ACY","EUG","HRL","LCK","MBS","CPR","GUM","ACV","ACT","SJT","DBQ","SWO","PAH","CGI","PIR","EAR","GGW","CEC","RKD","SPB","SEA","CVG","PGD","CID","LWS","SBY","PIH","BQK","RDD","RHI","BPT","EAU","PUB","LBL","TBN","MWA","AIA","CMI","GGG","VEL","DEC","TVF","MSY","OGG","STS","DRO","MTJ","RFD","ORH","PSM","BJI","LNY","MKK","IFP","LEB","MCK","SOW","AVP","CRW","ITH","SPI","OTZ","GUC","SMX","MMH","OGS","ALO","ENA","UIN","HOM","ANI","FMN","MAZ","MCG","STT","GRB","PHF","STX","FLG","ADQ","LAW","TWF","BRD","CMX","FCA","ASE","FAY","ISN","OWB","CDV","YAK","GST","ADK","CEZ","LIH","PIA","RAP","GRK","BGM","DUT","DLG","GAM","HNM","ANC","FAI","SDY","WMO","SHV","HTS","ERI","VDZ","ICT","ABI","MUE","AKN","SJU","CHO","TOL","MCI","OME","PPG","PGA","SHD","SDP","IAN","IDA","SCE","SPS","CVN","CRP","HYS","AVL","TLH","LCH","GSP","GRR","JAN","GFK","LBF","CNY","CPX","PSG","ROP","ATW","SLN","SVA","HDN","KKI","PQS"],["#DA","TUS","MKE","BOS","STL","CLE","ATL","MSP","BUF","MFR","BTM","#SF","#CH","#HU","HNL","RIC","COS","GSO","ILM","#NY","#MI","PHX","SAN","TPA","SYR","MLB","RST","IAG","COU","FLO","HGR","MCE","#LA","CMH","RNO","TTN","ABE","DTW","AUS","CHA","ROA","PVD","PWM","LIT","BGR","EWN","HVN","EKO","PNS","SWF","CLT","PDX","PBI","BOI","MRY","BNA","MEM","CHS","MYR","MSN","DAY","BTV","LBB","FAR","PSC","AMA","BIS","TRI","BRO","LYH","YKM","TYR","COD","ABR","GCC","SPN","ATY","CYS","PDT","RIW","SLC","ABQ","ORF","ELP","ITO","FSD","RDM","BLI","LBE","LSE","PUW","CKB","IPT","DIK","CDC","LAR","JMS","YNG","JAC","AEX","PSE","PHL","IND","BDL","OMA","OKC","LGB","GEG","BHM","DSM","ROC","CAK","BIL","BTR","SBA","DAB","FNT","EYW","MLI","MFE","SBN","GNV","TVC","SBP","GJT","LFT","EVV","GTF","BMI","EGE","MOT","LAN","ELM","DLH","AZO","LNK","SCK","HLN","BFL","MLU","SUN","YUM","ACK","CLL","GRI","MHK","VLD","JLN","ABY","TXK","ART","ESC","MEI","IMT","HIB","MKG","OTH","APN","HYA","PRC","PVC","PQI","AUG","BHB","CDR","DDC","HVR","IPL","IYK","MSL","MSS","OLF","#WA","MCO","ALB","AZA","VPS","MAF","MSO","FWA","AGS","JNU","FSM","PGV","OGD","PLN","ALS","CNM","IRK","LAS","SAT","PIT","SDF","TUL","SAV","PIE","PSP","FAT","BZN","SRQ","MDT","LEX","CAE","SGF","MOB","GPT","BLV","SAF","PVU","EAT","BET","ALW","DHN","CSG","SUX","GCK","HOB","RKS","INL","BFF","CDB","RUT","EWB","GLH","SLK","SVC","RDU","SFB","MHT","ISP","HPN","ACY","EUG","HRL","LCK","MBS","CPR","GUM","ACV","ACT","SJT","DBQ","SWO","PAH","CGI","PIR","EAR","GGW","CEC","RKD","SPB","SEA","CVG","PGD","CID","LWS","SBY","PIH","BQK","RDD","RHI","BPT","EAU","PUB","LBL","TBN","MWA","AIA","CMI","GGG","VEL","DEC","TVF","MSY","OGG","STS","DRO","MTJ","RFD","ORH","PSM","BJI","LNY","MKK","IFP","LEB","MCK","SOW","AVP","CRW","ITH","SPI","OTZ","GUC","SMX","MMH","OGS","ALO","ENA","UIN","HOM","ANI","FMN","MAZ","MCG","STT","GRB","PHF","STX","FLG","ADQ","LAW","TWF","BRD","CMX","FCA","ASE","FAY","ISN","OWB","CDV","YAK","GST","ADK","CEZ","LIH","PIA","RAP","GRK","BGM","DUT","DLG","GAM","HNM","ANC","FAI","SDY","WMO","SHV","HTS","ERI","VDZ","ICT","ABI","MUE","AKN","SJU","CHO","TOL","MCI","OME","PPG","PGA","SHD","SDP","IAN","IDA","SCE","SPS","CVN","CRP","HYS","AVL","TLH","LCH","GSP","GRR","JAN","GFK","LBF","CNY","CPX","PSG","ROP","ATW","SLN","SVA","HDN","KKI","PQS","SMF","HSV","ROW","HHH","JAX","VQS","CWA","SIT","LRD","SCC","STC","LWB","GDV","KSM","KOA","OAJ","GTR","KTN","TYS","BQN","MVY","PIB"],["#DA","TUS","MKE","BOS","STL","CLE","ATL","MSP","BUF","MFR","BTM","#SF","#CH","#HU","HNL","RIC","COS","GSO","ILM","#NY","#MI","PHX","SAN","TPA","SYR","MLB","RST","IAG","COU","FLO","HGR","MCE","#LA","CMH","RNO","TTN","ABE","DTW","AUS","CHA","ROA","PVD","PWM","LIT","BGR","EWN","HVN","EKO","PNS","SWF","CLT","PDX","PBI","BOI","MRY","BNA","MEM","CHS","MYR","MSN","DAY","BTV","LBB","FAR","PSC","AMA","BIS","TRI","BRO","LYH","YKM","TYR","COD","ABR","GCC","SPN","ATY","CYS","PDT","RIW","SLC","ABQ","ORF","ELP","ITO","FSD","RDM","BLI","LBE","LSE","PUW","CKB","IPT","DIK","CDC","LAR","JMS","YNG","JAC","AEX","PSE","PHL","IND","BDL","OMA","OKC","LGB","GEG","BHM","DSM","ROC","CAK","BIL","BTR","SBA","DAB","FNT","EYW","MLI","MFE","SBN","GNV","TVC","SBP","GJT","LFT","EVV","GTF","BMI","EGE","MOT","LAN","ELM","DLH","AZO","LNK","SCK","HLN","BFL","MLU","SUN","YUM","ACK","CLL","GRI","MHK","VLD","JLN","ABY","TXK","ART","ESC","MEI","IMT","HIB","MKG","OTH","APN","HYA","PRC","PVC","PQI","AUG","BHB","CDR","DDC","HVR","IPL","IYK","MSL","MSS","OLF","#WA","MCO","ALB","AZA","VPS","MAF","MSO","FWA","AGS","JNU","FSM","PGV","OGD","PLN","ALS","CNM","IRK","LAS","SAT","PIT","SDF","TUL","SAV","PIE","PSP","FAT","BZN","SRQ","MDT","LEX","CAE","SGF","MOB","GPT","BLV","SAF","PVU","EAT","BET","ALW","DHN","CSG","SUX","GCK","HOB","RKS","INL","BFF","CDB","RUT","EWB","GLH","SLK","SVC","RDU","SFB","MHT","ISP","HPN","ACY","EUG","HRL","LCK","MBS","CPR","GUM","ACV","ACT","SJT","DBQ","SWO","PAH","CGI","PIR","EAR","GGW","CEC","RKD","SPB","SEA","CVG","PGD","CID","LWS","SBY","PIH","BQK","RDD","RHI","BPT","EAU","PUB","LBL","TBN","MWA","AIA","CMI","GGG","VEL","DEC","TVF","MSY","OGG","STS","DRO","MTJ","RFD","ORH","PSM","BJI","LNY","MKK","IFP","LEB","MCK","SOW","AVP","CRW","ITH","SPI","OTZ","GUC","SMX","MMH","OGS","ALO","ENA","UIN","HOM","ANI","FMN","MAZ","MCG","STT","GRB","PHF","STX","FLG","ADQ","LAW","TWF","BRD","CMX","FCA","ASE","FAY","ISN","OWB","CDV","YAK","GST","ADK","CEZ","LIH","PIA","RAP","GRK","BGM","DUT","DLG","GAM","HNM","ANC","FAI","SDY","WMO","SHV","HTS","ERI","VDZ","ICT","ABI","MUE","AKN","SJU","CHO","TOL","MCI","OME","PPG","PGA","SHD","SDP","IAN","IDA","SCE","SPS","CVN","CRP","HYS","AVL","TLH","LCH","GSP","GRR","JAN","GFK","LBF","CNY","CPX","PSG","ROP","ATW","SLN","SVA","HDN","KKI","PQS","SMF","HSV","ROW","HHH","JAX","VQS","CWA","SIT","LRD","SCC","STC","LWB","GDV","KSM","KOA","OAJ","GTR","KTN","TYS","BQN","MVY","PIB","WYS","SSB","RSW","TEX"],["#DA","TUS","MKE","BOS","STL","CLE","ATL","MSP","BUF","MFR","BTM","#SF","#CH","#HU","HNL","RIC","COS","GSO","ILM","#NY","#MI","PHX","SAN","TPA","SYR","MLB","RST","IAG","COU","FLO","HGR","MCE","#LA","CMH","RNO","TTN","ABE","DTW","AUS","CHA","ROA","PVD","PWM","LIT","BGR","EWN","HVN","EKO","PNS","SWF","CLT","PDX","PBI","BOI","MRY","BNA","MEM","CHS","MYR","MSN","DAY","BTV","LBB","FAR","PSC","AMA","BIS","TRI","BRO","LYH","YKM","TYR","COD","ABR","GCC","SPN","ATY","CYS","PDT","RIW","SLC","ABQ","ORF","ELP","ITO","FSD","RDM","BLI","LBE","LSE","PUW","CKB","IPT","DIK","CDC","LAR","JMS","YNG","JAC","AEX","PSE","PHL","IND","BDL","OMA","OKC","LGB","GEG","BHM","DSM","ROC","CAK","BIL","BTR","SBA","DAB","FNT","EYW","MLI","MFE","SBN","GNV","TVC","SBP","GJT","LFT","EVV","GTF","BMI","EGE","MOT","LAN","ELM","DLH","AZO","LNK","SCK","HLN","BFL","MLU","SUN","YUM","ACK","CLL","GRI","MHK","VLD","JLN","ABY","TXK","ART","ESC","MEI","IMT","HIB","MKG","OTH","APN","HYA","PRC","PVC","PQI","AUG","BHB","CDR","DDC","HVR","IPL","IYK","MSL","MSS","OLF","#WA","MCO","ALB","AZA","VPS","MAF","MSO","FWA","AGS","JNU","FSM","PGV","OGD","PLN","ALS","CNM","IRK","LAS","SAT","PIT","SDF","TUL","SAV","PIE","PSP","FAT","BZN","SRQ","MDT","LEX","CAE","SGF","MOB","GPT","BLV","SAF","PVU","EAT","BET","ALW","DHN","CSG","SUX","GCK","HOB","RKS","INL","BFF","CDB","RUT","EWB","GLH","SLK","SVC","RDU","SFB","MHT","ISP","HPN","ACY","EUG","HRL","LCK","MBS","CPR","GUM","ACV","ACT","SJT","DBQ","SWO","PAH","CGI","PIR","EAR","GGW","CEC","RKD","SPB","SEA","CVG","PGD","CID","LWS","SBY","PIH","BQK","RDD","RHI","BPT","EAU","PUB","LBL","TBN","MWA","AIA","CMI","GGG","VEL","DEC","TVF","MSY","OGG","STS","DRO","MTJ","RFD","ORH","PSM","BJI","LNY","MKK","IFP","LEB","MCK","SOW","AVP","CRW","ITH","SPI","OTZ","GUC","SMX","MMH","OGS","ALO","ENA","UIN","HOM","ANI","FMN","MAZ","MCG","STT","GRB","PHF","STX","FLG","ADQ","LAW","TWF","BRD","CMX","FCA","ASE","FAY","ISN","OWB","CDV","YAK","GST","ADK","CEZ","LIH","PIA","RAP","GRK","BGM","DUT","DLG","GAM","HNM","ANC","FAI","SDY","WMO","SHV","HTS","ERI","VDZ","ICT","ABI","MUE","AKN","SJU","CHO","TOL","MCI","OME","PPG","PGA","SHD","SDP","IAN","IDA","SCE","SPS","CVN","CRP","HYS","AVL","TLH","LCH","GSP","GRR","JAN","GFK","LBF","CNY","CPX","PSG","ROP","ATW","SLN","SVA","HDN","KKI","PQS","SMF","HSV","ROW","HHH","JAX","VQS","CWA","SIT","LRD","SCC","STC","LWB","GDV","KSM","KOA","OAJ","GTR","KTN","TYS","BQN","MVY","PIB","WYS","SSB","RSW","TEX","MGM","JHM","WRG","EMK","SHH","DEN","USA","BRW"],["#DA","TUS","MKE","BOS","STL","CLE","ATL","MSP","BUF","MFR","BTM","#SF","#CH","#HU","HNL","RIC","COS","GSO","ILM","#NY","#MI","PHX","SAN","TPA","SYR","MLB","RST","IAG","COU","FLO","HGR","MCE","#LA","CMH","RNO","TTN","ABE","DTW","AUS","CHA","ROA","PVD","PWM","LIT","BGR","EWN","HVN","EKO","PNS","SWF","CLT","PDX","PBI","BOI","MRY","BNA","MEM","CHS","MYR","MSN","DAY","BTV","LBB","FAR","PSC","AMA","BIS","TRI","BRO","LYH","YKM","TYR","COD","ABR","GCC","SPN","ATY","CYS","PDT","RIW","SLC","ABQ","ORF","ELP","ITO","FSD","RDM","BLI","LBE","LSE","PUW","CKB","IPT","DIK","CDC","LAR","JMS","YNG","JAC","AEX","PSE","PHL","IND","BDL","OMA","OKC","LGB","GEG","BHM","DSM","ROC","CAK","BIL","BTR","SBA","DAB","FNT","EYW","MLI","MFE","SBN","GNV","TVC","SBP","GJT","LFT","EVV","GTF","BMI","EGE","MOT","LAN","ELM","DLH","AZO","LNK","SCK","HLN","BFL","MLU","SUN","YUM","ACK","CLL","GRI","MHK","VLD","JLN","ABY","TXK","ART","ESC","MEI","IMT","HIB","MKG","OTH","APN","HYA","PRC","PVC","PQI","AUG","BHB","CDR","DDC","HVR","IPL","IYK","MSL","MSS","OLF","#WA","MCO","ALB","AZA","VPS","MAF","MSO","FWA","AGS","JNU","FSM","PGV","OGD","PLN","ALS","CNM","IRK","LAS","SAT","PIT","SDF","TUL","SAV","PIE","PSP","FAT","BZN","SRQ","MDT","LEX","CAE","SGF","MOB","GPT","BLV","SAF","PVU","EAT","BET","ALW","DHN","CSG","SUX","GCK","HOB","RKS","INL","BFF","CDB","RUT","EWB","GLH","SLK","SVC","RDU","SFB","MHT","ISP","HPN","ACY","EUG","HRL","LCK","MBS","CPR","GUM","ACV","ACT","SJT","DBQ","SWO","PAH","CGI","PIR","EAR","GGW","CEC","RKD","SPB","SEA","CVG","PGD","CID","LWS","SBY","PIH","BQK","RDD","RHI","BPT","EAU","PUB","LBL","TBN","MWA","AIA","CMI","GGG","VEL","DEC","TVF","MSY","OGG","STS","DRO","MTJ","RFD","ORH","PSM","BJI","LNY","MKK","IFP","LEB","MCK","SOW","AVP","CRW","ITH","SPI","OTZ","GUC","SMX","MMH","OGS","ALO","ENA","UIN","HOM","ANI","FMN","MAZ","MCG","STT","GRB","PHF","STX","FLG","ADQ","LAW","TWF","BRD","CMX","FCA","ASE","FAY","ISN","OWB","CDV","YAK","GST","ADK","CEZ","LIH","PIA","RAP","GRK","BGM","DUT","DLG","GAM","HNM","ANC","FAI","SDY","WMO","SHV","HTS","ERI","VDZ","ICT","ABI","MUE","AKN","SJU","CHO","TOL","MCI","OME","PPG","PGA","SHD","SDP","IAN","IDA","SCE","SPS","CVN","CRP","HYS","AVL","TLH","LCH","GSP","GRR","JAN","GFK","LBF","CNY","CPX","PSG","ROP","ATW","SLN","SVA","HDN","KKI","PQS","SMF","HSV","ROW","HHH","JAX","VQS","CWA","SIT","LRD","SCC","STC","LWB","GDV","KSM","KOA","OAJ","GTR","KTN","TYS","BQN","MVY","PIB","WYS","SSB","RSW","TEX","MGM","JHM","WRG","EMK","SHH","DEN","USA","BRW","XNA","MQT","SNP","CIU","OOK","CYF"],["#DA","TUS","MKE","BOS","STL","CLE","ATL","MSP","BUF","MFR","BTM","#SF","#CH","#HU","HNL","RIC","COS","GSO","ILM","#NY","#MI","PHX","SAN","TPA","SYR","MLB","RST","IAG","COU","FLO","HGR","MCE","#LA","CMH","RNO","TTN","ABE","DTW","AUS","CHA","ROA","PVD","PWM","LIT","BGR","EWN","HVN","EKO","PNS","SWF","CLT","PDX","PBI","BOI","MRY","BNA","MEM","CHS","MYR","MSN","DAY","BTV","LBB","FAR","PSC","AMA","BIS","TRI","BRO","LYH","YKM","TYR","COD","ABR","GCC","SPN","ATY","CYS","PDT","RIW","SLC","ABQ","ORF","ELP","ITO","FSD","RDM","BLI","LBE","LSE","PUW","CKB","IPT","DIK","CDC","LAR","JMS","YNG","JAC","AEX","PSE","PHL","IND","BDL","OMA","OKC","LGB","GEG","BHM","DSM","ROC","CAK","BIL","BTR","SBA","DAB","FNT","EYW","MLI","MFE","SBN","GNV","TVC","SBP","GJT","LFT","EVV","GTF","BMI","EGE","MOT","LAN","ELM","DLH","AZO","LNK","SCK","HLN","BFL","MLU","SUN","YUM","ACK","CLL","GRI","MHK","VLD","JLN","ABY","TXK","ART","ESC","MEI","IMT","HIB","MKG","OTH","APN","HYA","PRC","PVC","PQI","AUG","BHB","CDR","DDC","HVR","IPL","IYK","MSL","MSS","OLF","#WA","MCO","ALB","AZA","VPS","MAF","MSO","FWA","AGS","JNU","FSM","PGV","OGD","PLN","ALS","CNM","IRK","LAS","SAT","PIT","SDF","TUL","SAV","PIE","PSP","FAT","BZN","SRQ","MDT","LEX","CAE","SGF","MOB","GPT","BLV","SAF","PVU","EAT","BET","ALW","DHN","CSG","SUX","GCK","HOB","RKS","INL","BFF","CDB","RUT","EWB","GLH","SLK","SVC","RDU","SFB","MHT","ISP","HPN","ACY","EUG","HRL","LCK","MBS","CPR","GUM","ACV","ACT","SJT","DBQ","SWO","PAH","CGI","PIR","EAR","GGW","CEC","RKD","SPB","SEA","CVG","PGD","CID","LWS","SBY","PIH","BQK","RDD","RHI","BPT","EAU","PUB","LBL","TBN","MWA","AIA","CMI","GGG","VEL","DEC","TVF","MSY","OGG","STS","DRO","MTJ","RFD","ORH","PSM","BJI","LNY","MKK","IFP","LEB","MCK","SOW","AVP","CRW","ITH","SPI","OTZ","GUC","SMX","MMH","OGS","ALO","ENA","UIN","HOM","ANI","FMN","MAZ","MCG","STT","GRB","PHF","STX","FLG","ADQ","LAW","TWF","BRD","CMX","FCA","ASE","FAY","ISN","OWB","CDV","YAK","GST","ADK","CEZ","LIH","PIA","RAP","GRK","BGM","DUT","DLG","GAM","HNM","ANC","FAI","SDY","WMO","SHV","HTS","ERI","VDZ","ICT","ABI","MUE","AKN","SJU","CHO","TOL","MCI","OME","PPG","PGA","SHD","SDP","IAN","IDA","SCE","SPS","CVN","CRP","HYS","AVL","TLH","LCH","GSP","GRR","JAN","GFK","LBF","CNY","CPX","PSG","ROP","ATW","SLN","SVA","HDN","KKI","PQS","SMF","HSV","ROW","HHH","JAX","VQS","CWA","SIT","LRD","SCC","STC","LWB","GDV","KSM","KOA","OAJ","GTR","KTN","TYS","BQN","MVY","PIB","WYS","SSB","RSW","TEX","MGM","JHM","WRG","EMK","SHH","DEN","USA","BRW","XNA","MQT","SNP","CIU","OOK","CYF","PBG","BKG","DVL","ECP","SGU"],["#DA","TUS","MKE","BOS","STL","CLE","ATL","MSP","BUF","MFR","BTM","#SF","#CH","#HU","HNL","RIC","COS","GSO","ILM","#NY","#MI","PHX","SAN","TPA","SYR","MLB","RST","IAG","COU","FLO","HGR","MCE","#LA","CMH","RNO","TTN","ABE","DTW","AUS","CHA","ROA","PVD","PWM","LIT","BGR","EWN","HVN","EKO","PNS","SWF","CLT","PDX","PBI","BOI","MRY","BNA","MEM","CHS","MYR","MSN","DAY","BTV","LBB","FAR","PSC","AMA","BIS","TRI","BRO","LYH","YKM","TYR","COD","ABR","GCC","SPN","ATY","CYS","PDT","RIW","SLC","ABQ","ORF","ELP","ITO","FSD","RDM","BLI","LBE","LSE","PUW","CKB","IPT","DIK","CDC","LAR","JMS","YNG","JAC","AEX","PSE","PHL","IND","BDL","OMA","OKC","LGB","GEG","BHM","DSM","ROC","CAK","BIL","BTR","SBA","DAB","FNT","EYW","MLI","MFE","SBN","GNV","TVC","SBP","GJT","LFT","EVV","GTF","BMI","EGE","MOT","LAN","ELM","DLH","AZO","LNK","SCK","HLN","BFL","MLU","SUN","YUM","ACK","CLL","GRI","MHK","VLD","JLN","ABY","TXK","ART","ESC","MEI","IMT","HIB","MKG","OTH","APN","HYA","PRC","PVC","PQI","AUG","BHB","CDR","DDC","HVR","IPL","IYK","MSL","MSS","OLF","#WA","MCO","ALB","AZA","VPS","MAF","MSO","FWA","AGS","JNU","FSM","PGV","OGD","PLN","ALS","CNM","IRK","LAS","SAT","PIT","SDF","TUL","SAV","PIE","PSP","FAT","BZN","SRQ","MDT","LEX","CAE","SGF","MOB","GPT","BLV","SAF","PVU","EAT","BET","ALW","DHN","CSG","SUX","GCK","HOB","RKS","INL","BFF","CDB","RUT","EWB","GLH","SLK","SVC","RDU","SFB","MHT","ISP","HPN","ACY","EUG","HRL","LCK","MBS","CPR","GUM","ACV","ACT","SJT","DBQ","SWO","PAH","CGI","PIR","EAR","GGW","CEC","RKD","SPB","SEA","CVG","PGD","CID","LWS","SBY","PIH","BQK","RDD","RHI","BPT","EAU","PUB","LBL","TBN","MWA","AIA","CMI","GGG","VEL","DEC","TVF","MSY","OGG","STS","DRO","MTJ","RFD","ORH","PSM","BJI","LNY","MKK","IFP","LEB","MCK","SOW","AVP","CRW","ITH","SPI","OTZ","GUC","SMX","MMH","OGS","ALO","ENA","UIN","HOM","ANI","FMN","MAZ","MCG","STT","GRB","PHF","STX","FLG","ADQ","LAW","TWF","BRD","CMX","FCA","ASE","FAY","ISN","OWB","CDV","YAK","GST","ADK","CEZ","LIH","PIA","RAP","GRK","BGM","DUT","DLG","GAM","HNM","ANC","FAI","SDY","WMO","SHV","HTS","ERI","VDZ","ICT","ABI","MUE","AKN","SJU","CHO","TOL","MCI","OME","PPG","PGA","SHD","SDP","IAN","IDA","SCE","SPS","CVN","CRP","HYS","AVL","TLH","LCH","GSP","GRR","JAN","GFK","LBF","CNY","CPX","PSG","ROP","ATW","SLN","SVA","HDN","KKI","PQS","SMF","HSV","ROW","HHH","JAX","VQS","CWA","SIT","LRD","SCC","STC","LWB","GDV","KSM","KOA","OAJ","GTR","KTN","TYS","BQN","MVY","PIB","WYS","SSB","RSW","TEX","MGM","JHM","WRG","EMK","SHH","DEN","USA","BRW","XNA","MQT","SNP","CIU","OOK","CYF","PBG","BKG","DVL","ECP","SGU"]];