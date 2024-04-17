import { Injectable } from "@nestjs/common";
import { load } from "cheerio";
import puppeteer from "puppeteer";
import { decimalToDMS } from "src/utils/coordinates";
import { formRes } from "src/utils/formRes";
import { selectors } from "src/utils/selectors";
import { GetPointsDto } from "./natal.dto";

@Injectable()
export class NatalService {
    async getPoints(body:GetPointsDto){
        try {
            const coords = {
                lat:{
                    d:decimalToDMS(body.coordinates.lat).degrees,
                    m:decimalToDMS(body.coordinates.lat).minutes,
                    s:body.coordinates.lat > 0 ? 0 : 1
                },
                lng:{
                    d:decimalToDMS(body.coordinates.lng).degrees,
                    m:decimalToDMS(body.coordinates.lng).minutes,
                    s:decimalToDMS(body.coordinates.lng).degrees > 0 ? 1 : 0
                }
            }
            const browser = await puppeteer.launch({
                headless: true,
                defaultViewport: null
              });
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(0);
            await page.goto(process.env.PARSE_URL);
            
             await page.select(`select[name="${selectors.day.name}"]`, body.day)
             await page.select(`select[name="${selectors.month.name}"]`, body.month)
             await page.select(`select[name="${selectors.year.name}"]`, body.year)
             await page.select(`select[name="${selectors.minute.name}"]`, body.minute)
             await page.select(`select[name="${selectors.hour.name}"]`, body.hour)
             const a = await page.$$(selectors.link.className)
             await a[0].click();
             await page.$eval(`input[name="${selectors.coords.lat.l1.name}"]`, e=>e.value="")
             await page.type(`input[name="${selectors.coords.lat.l1.name}"]`, `${coords.lat.d}`)
             await page.$eval(`input[name="${selectors.coords.lat.l2.name}"]`, e=>e.value="")
             await page.type(`input[name="${selectors.coords.lat.l2.name}"]`, `${coords.lat.m}`)
             await page.$eval(`input[name="${selectors.coords.lng.lng1.name}"]`, e=>e.value="")
             await page.type(`input[name="${selectors.coords.lng.lng1.name}"]`, `${coords.lng.d}`)
             await page.$eval(`input[name="${selectors.coords.lng.lng2.name}"]`, e=>e.value="")
             await page.type(`input[name="${selectors.coords.lng.lng2.name}"]`, `${coords.lng.m}`)
             await page.select(`select[name="${selectors.coords.lat.s.name}"]`, `${coords.lat.s}`)
             await page.select(`select[name="${selectors.coords.lng.s.name}"]`, `${coords.lng.s}`)
             const btn = await page.$$(selectors.button.className)
             await btn[0].click()
             await page.waitForNavigation()
            const html = await page.evaluate(()=>{
                return{
                    html: document.documentElement.innerHTML
                }
            })
            const $ = load(html.html)
            const tbl = $(selectors.table.form.id).find('div')
            const tblFiltered = [...tbl].filter((e)=>e.attribs.style==="float: left; width: 35px; text-align: left; padding-right: 0px;")
            let res = [];
            tblFiltered.map((el)=>{
                el.children.filter((e)=>e.type==="tag").map((child:any)=>{
                    child.children.map((text)=>{
                        res.push(text.data)
                    })
                })
            })
            res = res.slice(0, 20);
            const points = formRes(res);
            await browser.close();
            return points;
        } catch (error) {
            throw error;
        }
    }
}