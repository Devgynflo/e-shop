import { NextPage } from "next";
import Link from "next/link";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { MdFacebook } from "react-icons/md";
import { Container } from "../container";
import { FooterList } from "./footer-list";

interface FooterProps {}

const Footer: NextPage<FooterProps> = ({}) => {
  const getFullyear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-slate-700 text-sm text-slate-200">
      <Container>
        <div className="flex-xol flex justify-between pb-8 pt-16 md:flex-row">
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Catégories</h3>
            <Link href={"/?category=Phone"}>Téléphones</Link>
            <Link href={"/?category=Laptop"}>Laptops</Link>
            <Link href={"/?category=Desktop"}>Ordinateurs</Link>
            <Link href={"/?category=Watch"}>Montres</Link>
            <Link href={"/?category=Tv"}>Tv</Link>
            <Link href={"/?category=Accessories"}>Acccessoires</Link>
          </FooterList>
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Services clients</h3>
            <Link href={"#"}>Contactez-nous</Link>
            <Link href={"#"}>Conditions générales de ventes</Link>
            <Link href={"#"}>Retours & Echanges</Link>
            <Link href={"#"}>FAQs</Link>
          </FooterList>
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <h3 className="mb-2 text-base font-bold">A propos</h3>
            <p className="mb-2">
              Dans notre magasin d&apos;électronique, nous nous efforçons de
              fournir à nos clients les appareils et accessoires les plus
              récents et les plus performants.Avec une large gamme de
              téléphones, de téléviseurs, d&apos;ordinateurs portables, de
              montres et d&apos;accessoires...
            </p>
            <p>&copy;{getFullyear} E-Shop Gynflo. Tous droit réservés.</p>
          </div>
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Suivez-nous</h3>
            <div className="flex gap-2">
              <Link href={"#"}>
                <MdFacebook size={24} />
              </Link>
              <Link href={"#"}>
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href={"#"}>
                <AiFillInstagram size={24} />
              </Link>
              <Link href={"#"}>
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
